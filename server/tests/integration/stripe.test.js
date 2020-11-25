require("dotenv").config();
const { ExpectationFailed } = require("http-errors");
const { TestScheduler } = require("jest");
const cookieParser = require("cookie-parser");
const supertest = require("supertest");
const mongoose = require("mongoose");
const express = require("express");
const populateDB = require("../../utility/populatedb");

const patientRouter = require("../../routes/patientRoutes");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/patient", patientRouter);

let patients = [];
let doctors = [];
let appointments = [];

beforeAll(async () => {
  await mongoose.connect(process.env.DB_CONNECTION + "/stripetest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  const retval = await populateDB();

  if (retval !== null) {
    patients = retval.patients;
    doctors = retval.doctors;
    appointments = retval.appointments;
  }
});

afterAll(async () => {
  await mongoose.connection.dropCollection("users");
  await mongoose.connection.dropCollection("appointments");
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

/**
 * User signs in and makes a payment intent
 */
test("User signs in and makes a payment intent", async () => {
  let userFields = {
    email: "brucewayne@gmail.com",
    password: "batmanishere",
  };
  let res = await supertest(app).post("/patient/signin").send(userFields);
  expect(res.status).toBe(200);
  expect(res.body.user).toBe(patients[7]);
  const cookie = res.headers["set-cookie"];

  res = await supertest(app).post("/patient/pay").set("Cookie", cookie);
  expect(res.status).toBe(200);
});
