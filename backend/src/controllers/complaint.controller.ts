import { Request, Response } from "express";
import { Complaint } from "../models/Complaint";
import { TrackingCode } from "../models/TrackingCode";
import { IUser } from "../types";

interface AuthRequest extends Request {
  user?: IUser;
}

// Create a new complaint
export const createComplaint = async (req: Request, res: Response) => {
  try {
    const complaint = await Complaint.create({
      ...req.body,
      status: "pending_review",
      adminReviewed: false,
    });

    // Generate tracking code
    const trackingCode = await TrackingCode.create({
      complaintId: complaint._id,
      code: Math.random().toString(36).substring(2, 15),
      email: req.body.email,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    res.status(201).json({ complaint, trackingCode: trackingCode.code });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get all complaints based on user role and filters
export const getComplaints = async (req: AuthRequest, res: Response) => {
  try {
    const { status, department } = req.query;
    const filter: any = {};

    if (status) filter.status = status;
    if (department) filter.department = department;

    // Add role-based filters
    if (req.user?.role === "student") {
      filter.submittedBy = req.user._id;
    } else if (req.user?.role === "faculty") {
      filter.faculty = req.user._id;
    } else if (req.user?.role === "hod") {
      filter.$or = [
        { hod: req.user._id },
        { status: "forwarded_to_hod", department: req.user.department },
      ];
    }

    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get complaint by ID
export const getComplaintById = async (req: Request, res: Response) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.json(complaint);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get complaint by tracking code
export const getComplaintByTrackingCode = async (
  req: Request,
  res: Response
) => {
  try {
    const trackingCode = await TrackingCode.findOne({
      code: req.params.code,
      expiresAt: { $gt: new Date() },
    });

    if (!trackingCode) {
      return res
        .status(404)
        .json({ message: "Invalid or expired tracking code" });
    }

    const complaint = await Complaint.findById(trackingCode.complaintId);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json(complaint);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Update complaint status (Admin)
export const updateComplaintStatus = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { status, faculty } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status;
    complaint.adminReviewed = true;

    if (status != "rejected" && faculty) {
      complaint.faculty = faculty;
    }

    await complaint.save();
    res.json(complaint);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Faculty response to complaint
export const facultyResponse = async (req: AuthRequest, res: Response) => {
  try {
    const { message, action } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.facultyResponse = {
      message,
      date: new Date().toISOString(),
    };

    if (action === "resolve") {
      complaint.status = "closed_by_faculty";
    } else if (action === "forward") {
      complaint.status = "forwarded_to_hod";
    }

    await complaint.save();
    res.json(complaint);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// HOD resolution
export const hodResolution = async (req: AuthRequest, res: Response) => {
  try {
    const { resolution } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.facultyResponse = {
      message: resolution,
      date: new Date().toISOString(),
    };
    complaint.status = "resolved";
    complaint.hod = req.user?._id;

    await complaint.save();
    res.json(complaint);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
