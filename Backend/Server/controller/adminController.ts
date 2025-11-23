import type { Request, Response } from "express";
import Doctor from "../models/DoctorModel.ts";
import Patient from "../models/PatientModel.ts";
import AppointmentModel from "../models/Appintment.ts";
import Hospital from "../models/HospitalModel.ts";
import Department from "../models/DepartmentModel.ts";
import User from "../models/UserModel.ts";

// Get dashboard statistics
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [
      totalPatients,
      totalDoctors,
      totalAppointments,
      pendingDoctors,
      todayAppointments,
      activeUsers,
    ] = await Promise.all([
      Patient.countDocuments(),
      Doctor.countDocuments({ isApproved: true }),
      AppointmentModel.countDocuments(),
      Doctor.countDocuments({ isApproved: false }),
      AppointmentModel.countDocuments({
        scheduledAt: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          $lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      }),
      User.countDocuments({ isActive: true }),
    ]);

    // Get today's revenue (mock for now)
    const todayRevenue = 45678;

    // Get recent appointments
    const recentAppointments = await AppointmentModel.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("patientId", "name")
      .populate("doctorId", "name specialization");

    // Get emergency alerts (critical appointments)
    const emergencyAlerts = await AppointmentModel.find({
      status: "pending",
      scheduledAt: { $lte: new Date(Date.now() + 60 * 60 * 1000) },
    })
      .populate("patientId", "name phone")
      .populate("doctorId", "name")
      .limit(5);

    res.json({
      success: true,
      data: {
        statistics: {
          totalPatients,
          totalDoctors,
          totalAppointments,
          pendingDoctors,
          todayAppointments,
          todayRevenue,
          activeUsers,
        },
        recentAppointments,
        emergencyAlerts,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard stats",
      error: error.message,
    });
  }
};

// Get all users with filters
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { role, status, search, page = 1, limit = 20 } = req.query;

    const query: any = {};
    if (role) query.role = role;
    if (status) query.isActive = status === "active";
    if (search) {
      query.$or = [
        { email: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(query)
      .select("-password")
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};

// Update user status
export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, reason } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      {
        isActive: status === "active",
        ...(reason && { statusReason: reason }),
      },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User status updated successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error updating user status",
      error: error.message,
    });
  }
};

// Approve doctor
export const approveDoctor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const adminId = req.user?.id;

    const doctor = await Doctor.findByIdAndUpdate(
      id,
      {
        isApproved: true,
        approvedBy: adminId,
        approvedAt: new Date(),
      },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Update user status
    await User.findByIdAndUpdate(doctor.userId, { isActive: true });

    res.json({
      success: true,
      message: "Doctor approved successfully",
      data: doctor,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error approving doctor",
      error: error.message,
    });
  }
};

// Get analytics data
export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, metric } = req.query;

    const dateFilter: any = {};
    if (startDate) dateFilter.$gte = new Date(startDate as string);
    if (endDate) dateFilter.$lte = new Date(endDate as string);

    // Revenue analytics (mock data for now)
    const revenueData = {
      total: 456789,
      trend: "up",
      percentageChange: 15.5,
      breakdown: [
        { date: "2025-01-01", amount: 15000 },
        { date: "2025-01-02", amount: 18000 },
        { date: "2025-01-03", amount: 16500 },
      ],
    };

    // Appointment analytics
    const appointmentStats = await AppointmentModel.aggregate([
      { $match: dateFilter.createdAt ? { createdAt: dateFilter } : {} },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Patient analytics
    const patientGrowth = await Patient.aggregate([
      { $match: dateFilter.createdAt ? { createdAt: dateFilter } : {} },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      data: {
        revenue: revenueData,
        appointments: appointmentStats,
        patients: patientGrowth,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching analytics",
      error: error.message,
    });
  }
};

// Hospital management
export const createHospital = async (req: Request, res: Response) => {
  try {
    const hospital = await Hospital.create(req.body);
    res.status(201).json({
      success: true,
      message: "Hospital created successfully",
      data: hospital,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error creating hospital",
      error: error.message,
    });
  }
};

export const getHospitals = async (req: Request, res: Response) => {
  try {
    const hospitals = await Hospital.find({ isActive: true });
    res.json({
      success: true,
      data: hospitals,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching hospitals",
      error: error.message,
    });
  }
};

// Department management
export const createDepartment = async (req: Request, res: Response) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json({
      success: true,
      message: "Department created successfully",
      data: department,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error creating department",
      error: error.message,
    });
  }
};

export const getDepartments = async (req: Request, res: Response) => {
  try {
    const { hospitalId } = req.query;
    const query = hospitalId ? { hospitalId, isActive: true } : { isActive: true };
    
    const departments = await Department.find(query)
      .populate("headOfDepartment", "name specialization")
      .populate("hospitalId", "name");
      
    res.json({
      success: true,
      data: departments,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching departments",
      error: error.message,
    });
  }
};
