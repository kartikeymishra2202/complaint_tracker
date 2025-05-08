import express from "express";
import {
  createComplaint,
  getComplaints,
  getComplaintById,
  getComplaintByTrackingCode,
  updateComplaintStatus,
  facultyResponse,
  hodResolution,
} from "../controllers/complaint.controller";
import { protect, authorize } from "../middleware/auth";

const router = express.Router();

// Public routes
router.post("/", createComplaint);
router.get("/track/:code", getComplaintByTrackingCode);

// middleware used for protection
router.use(protect);

// All authenticated users can be accesss the following remaining routes
router.get("/", getComplaints);
router.get("/:id", getComplaintById);

router.put("/:id/status", authorize("admin"), updateComplaintStatus);

router.put("/:id/faculty-response", authorize("faculty"), facultyResponse);

router.put("/:id/hod-resolution", authorize("hod"), hodResolution);

export default router;
