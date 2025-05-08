import mongoose from "mongoose";
import { ITrackingCode } from "../types";

const trackingCodeSchema = new mongoose.Schema<ITrackingCode>(
  {
    complaintId: {
      type: String,
      required: true,
      ref: "Complaint",
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance and to ensure unique codes
trackingCodeSchema.index({ code: 1 }, { unique: true });
trackingCodeSchema.index({ complaintId: 1 });
trackingCodeSchema.index({ email: 1 });
trackingCodeSchema.index({ expiresAt: 1 });

export const TrackingCode = mongoose.model<ITrackingCode>(
  "TrackingCode",
  trackingCodeSchema
);
