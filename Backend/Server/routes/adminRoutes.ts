import express from "express";
import { authMiddleware } from "../middleware/auth.ts";
import { requireAdmin } from "../middleware/roleCheck.ts";
import {
  getDashboardStats,
  getAllUsers,
  updateUserStatus,
  approveDoctor,
  getAnalytics,
  createHospital,
  getHospitals,
  createDepartment,
  getDepartments,
} from "../controller/adminController.ts";

const router = express.Router();

// All routes require admin authentication
router.use(authMiddleware);
router.use(requireAdmin);

// Dashboard
router.get("/dashboard", getDashboardStats);

// User Management
router.get("/users", getAllUsers);
router.put("/users/:id/status", updateUserStatus);

// Doctor Management
router.put("/doctors/:id/approve", approveDoctor);

// Analytics
router.get("/analytics", getAnalytics);

// Hospital Management
router.post("/hospitals", createHospital);
router.get("/hospitals", getHospitals);

// Department Management
router.post("/departments", createDepartment);
router.get("/departments", getDepartments);

export default router;
