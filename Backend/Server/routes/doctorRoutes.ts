import express from "express";
import {
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  approveDoctor,
  deleteDoctor,
  getDoctorAvailability,
  setDoctorAvailability,
} from "../controller/doctorController.ts";
import { authMiddleware } from "../middleware/auth.ts";

const router = express.Router();

// Public routes
router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.get("/:id/availability", getDoctorAvailability);

// Protected routes
router.use(authMiddleware);
router.put("/:id", updateDoctor);
router.put("/:id/approve", approveDoctor);
router.delete("/:id", deleteDoctor);
router.post("/availability", setDoctorAvailability);

export default router;
