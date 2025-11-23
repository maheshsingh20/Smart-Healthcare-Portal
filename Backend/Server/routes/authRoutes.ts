import express from "express";
import {
  doctorSignup,
  doctorLogin,
  patientSignup,
  patientLogin,
  adminSignup,
  adminLogin,
} from "../controller/authcontroller.ts";
const router = express.Router();
// Doctor
router.post("/doctor/signup", doctorSignup);
router.post("/doctor/login", doctorLogin);
// Patient
router.post("/patient/signup", patientSignup);
router.post("/patient/login", patientLogin);
// Admin
router.post("/admin/signup", adminSignup);
router.post("/admin/login", adminLogin);
export default router;