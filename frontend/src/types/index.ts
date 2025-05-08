export type UserRole = "student" | "admin" | "faculty" | "hod";

export type ComplaintStatus =
  | "pending_review"
  | "sent_to_faculty"
  | "closed_by_faculty"
  | "forwarded_to_hod"
  | "resolved"
  | "rejected";

export interface User {
  token: string;
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  createdAt: string;
}

export interface FacultyResponse {
  message: string;
  date: string;
}

export interface Complaint {
  _id: string;
  title: string;
  description: string;
  department: string;
  submittedBy: string;
  status: ComplaintStatus;
  faculty?: string;
  hod?: string;
  facultyResponse?: FacultyResponse;
  adminReviewed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TrackingCode {
  _id: string;
  complaintId: string;
  code: string;
  email: string;
  expiresAt: string;
}
