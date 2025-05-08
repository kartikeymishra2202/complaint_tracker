export type UserRole = "student" | "admin" | "faculty" | "hod";

export type ComplaintStatus =
  | "pending_review"
  | "sent_to_faculty"
  | "closed_by_faculty"
  | "forwarded_to_hod"
  | "resolved"
  | "rejected";

export interface FacultyResponse {
  message: string;
  date: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  department: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IComplaint {
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
  createdAt: Date;
  updatedAt: Date;
}

export interface ITrackingCode {
  _id: string;
  complaintId: string;
  code: string;
  email: string;
  expiresAt: Date;
}
