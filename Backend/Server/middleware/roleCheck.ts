import type { Request, Response, NextFunction } from "express";

export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
    }

    next();
  };
};

export const requireAdmin = requireRole(["admin"]);
export const requireDoctor = requireRole(["doctor"]);
export const requirePatient = requireRole(["patient"]);
export const requireDoctorOrAdmin = requireRole(["doctor", "admin"]);
