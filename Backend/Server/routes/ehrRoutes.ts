import express from "express";
import { getEHR, updateEHR, addDocument } from "../controller/ehrController.ts";
import { authMiddleware } from "../middleware/auth.ts";

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.get("/", getEHR);
router.get("/:patientId", getEHR);
router.put("/", updateEHR);
router.post("/document", addDocument);

export default router;
