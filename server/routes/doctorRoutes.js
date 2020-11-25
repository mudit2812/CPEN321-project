/*
 * Routes dedicated to handling requests from doctors or requests pertaining
 * to doctors
 */

const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const appointController = require("../controllers/appointController");
const { requireAuth } = require("../middleware/authMiddleware");
const router = express.Router();

// Convenient endpoint for viewing all doctors
router.get("/", userController.getDoctors);

/*
 * Routes relating to doctor authentication
 */
router.post("/signup", authController.signupDoctor);

router.post("/signin", authController.signinDoctor);

router.get("/signout", authController.signoutDoctor);

/*
 * Routes relating to doctor CRUB database operations
 */
router.get("/:id", requireAuth, userController.getDoctorById);

router.put("/:id", requireAuth, userController.putDoctorById);

router.delete("/:id", requireAuth, userController.deleteDoctorById);

/*
 * Routes relating to appointment booking
 */
router.get("/appointment/:id", requireAuth, appointController.getAppointments);

router.post("/appointment", requireAuth, appointController.postAppointment);

router.put("/appointment/:id", requireAuth, appointController.putAppointment);

router.delete(
  "/appointment/:id",
  requireAuth,
  appointController.deleteAppointment
);

module.exports = router;
