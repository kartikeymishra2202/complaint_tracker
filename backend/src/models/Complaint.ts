import mongoose from "mongoose";
import { IComplaint, ComplaintStatus } from "../types";

const facultyResponseSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const complaintSchema = new mongoose.Schema<IComplaint>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    submittedBy: {
      type: String,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: [
        "pending_review",
        "sent_to_faculty",
        "closed_by_faculty",
        "forwarded_to_hod",
        "resolved",
        "rejected",
      ] as ComplaintStatus[],
      default: "pending_review",
    },
    faculty: {
      type: String,
      ref: "User",
    },
    hod: {
      type: String,
      ref: "User",
    },
    facultyResponse: facultyResponseSchema,
    adminReviewed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
complaintSchema.index({ status: 1 });
complaintSchema.index({ department: 1 });
complaintSchema.index({ submittedBy: 1 });
complaintSchema.index({ faculty: 1 });
complaintSchema.index({ hod: 1 });

export const Complaint = mongoose.model<IComplaint>(
  "Complaint",
  complaintSchema
);
