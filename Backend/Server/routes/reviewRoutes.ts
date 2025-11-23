import express from "express";
import {
  createReview,
  getDoctorReviews,
  respondToReview,
} from "../controller/reviewController.ts";
import { authMiddleware } from "../middleware/auth.ts";

const router = express.Router();

router.get("/doctor/:doctorId", getDoctorReviews);

// Protected routes
router.use(authMiddleware);
router.post("/", createReview);
router.put("/:id/respond", respondToReview);

export default router;
