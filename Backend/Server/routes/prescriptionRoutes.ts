import express from "express";
import {
  createPrescription,
  getPatientPrescriptions,
  getPrescriptionById,
} from "../controller/prescriptionController.ts";
import { authMiddleware } from "../middleware/auth.ts";

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.post("/", createPrescription);
router.get("/patient", getPatientPrescriptions);
router.get("/patient/:patientId", getPatientPrescriptions);
router.get("/:id", getPrescriptionById);

export default router;
