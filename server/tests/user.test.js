require("dotenv").config();
const { ExpectationFailed } = require("http-errors");
const { TestScheduler } = require("jest");
const supertest = require("supertest");
const user = require("../controllers/userController");
const express = require("express");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

const patientRouter = require("../routes/patientRoutes");
const doctorRouter = require("../routes/doctorRoutes");
const { initMongo, closeMongo } = require("../config/db");
const { forEach } = require("async");

const app = express();
app.use(express.json());
app.use("/patient", patientRouter);
app.use("/doctor", doctorRouter);

beforeAll((done) => {
  initMongo();
  done();
});

afterAll((done) => {
  closeMongo();
  done();
});

jest.mock("../middleware/authMiddleware");

const { requireAuth } = require("../middleware/authMiddleware");

test("Expect to get all patients when making request to get a list of all patients (no mocking)", async () => {
  const res = await supertest(app).get("/patient/");
  expect(res.body.length).toBe(8);
  res.body.forEach((item) => {
    expect(item.userkey).toBe("Patient");
    expect(item.age).toBeGreaterThanOrEqual(0);
    expect(typeof item.first_name).toBe("string");
    expect(typeof item.last_name).toBe("string");
    expect(typeof item.gender).toBe("string");
  });
});

test("Expect to get all doctors when making request to get a list of all doctors (no mocking)", async () => {
  const res = await supertest(app).get("/doctor/");
  expect(res.body.length).toBe(8);
  res.body.forEach((item) => {
    expect(item.userkey).toBe("Doctor");
    expect(item.age).toBeGreaterThanOrEqual(0);
    expect(typeof item.first_name).toBe("string");
    expect(typeof item.last_name).toBe("string");
    expect(item.years_of_experience).toBeGreaterThan(0);
    expect(typeof item.specialization).toBe("string");
  });
});

test("Expect to get patient with name Lucy Stank when requesting patient with certain id (no mocking)", async () => {
  const res = await supertest(app).get("/patient/5f9ce563b761fe125cece991");
  expect(res.body.userkey).toBe("Patient");
  expect(res.body.age).toBe(22);
  expect(res.body._id).toBe("5f9ce563b761fe125cece991");
  expect(res.body.first_name).toBe("Lucy");
  expect(res.body.last_name).toBe("Stank");
  expect(res.body.gender).toBe("Female");
});

test("Expect to get doctor with name Tor Aamodt when requesting doctor with certain id (mocking auth)", async () => {
  requireAuth.mockImplementation((req, res, next) => {
    next();
  });

  const res = await supertest(app).get("/doctor/5f9ce561b761fe125cece989");
  expect(res.body.userkey).toBe("Doctor");
  expect(res.body.age).toBe(45);
  expect(res.body._id).toBe("5f9ce561b761fe125cece989");
  expect(res.body.first_name).toBe("Tor");
  expect(res.body.last_name).toBe("Aamodt");
  expect(res.body.specialization).toBe("Oncology");
});

test("Expect to get list of patients with 1 item when making request to get a list of all patients", async () => {
  const getUserMock = jest.fn(async (req, res, model) =>
    model === Doctor
      ? res.status(200).json([])
      : model === Patient
      ? res.status(200).json([
          {
            appointments: [],
            userkey: "Patient",
            _id: "5f9ce563b761fe125cece98e",
            first_name: "Mary",
            last_name: "Joe",
            email: "maryjoe@gmail.com",
            password:
              "$2a$10$MBWwvXEaojmr76GOwhcq1Ob5jd9WzdURxBv/lEdQ6FYuV5hI61BR2",
            age: 30,
            gender: "Female",
            height: 170,
            weight: 60,
            createdAt: "2020-10-31T04:17:39.398Z",
            updatedAt: "2020-10-31T04:17:39.398Z",
            __v: 0,
          },
        ])
      : res.status(400)
  );

  user.getUser = getUserMock;

  const res = await supertest(app).get("/patient/");
  expect(res.body.length).toBe(1);
  expect(res.body[0].userkey).toBe("Patient");
  expect(res.body[0].first_name).toBe("Mary");
  expect(res.body[0].last_name).toBe("Joe");

  expect(getUserMock.mock.calls.length).toBe(1);
});

// comment for adding commit to show TA TravisCI

test("Expect to get no doctors when making request to get a list of all doctors", async () => {
  const getUserMock = jest.fn(async (req, res, model) =>
    model === Doctor
      ? res.status(200).json([])
      : model === Patient
      ? res.status(200).json([
          {
            appointments: [],
            userkey: "Patient",
            _id: "5f9ce563b761fe125cece98e",
            first_name: "Mary",
            last_name: "Joe",
            email: "maryjoe@gmail.com",
            password:
              "$2a$10$MBWwvXEaojmr76GOwhcq1Ob5jd9WzdURxBv/lEdQ6FYuV5hI61BR2",
            age: 30,
            gender: "Female",
            height: 170,
            weight: 60,
            createdAt: "2020-10-31T04:17:39.398Z",
            updatedAt: "2020-10-31T04:17:39.398Z",
            __v: 0,
          },
        ])
      : res.status(400)
  );

  user.getUser = getUserMock;

  const res = await supertest(app).get("/doctor/");
  expect(res.body.length).toBe(0);
  expect(getUserMock.mock.calls.length).toBe(1);
});
