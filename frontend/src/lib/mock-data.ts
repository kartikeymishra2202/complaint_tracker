
import { Complaint, TrackingCode, User } from "@/types";

// Mock departments
export const departments = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Information Technology",
  "Business Administration"
];

// Mock users for different roles
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "John Student",
    email: "john@university.edu",
    role: "student",
    department: "Computer Science",
    createdAt: new Date(2023, 5, 15).toISOString()
  },
  {
    id: "user-2",
    name: "Admin User",
    email: "admin@university.edu",
    role: "admin",
    department: "Administration",
    createdAt: new Date(2023, 1, 10).toISOString()
  },
  {
    id: "user-3",
    name: "Prof. Smith",
    email: "smith@university.edu",
    role: "faculty",
    department: "Computer Science",
    createdAt: new Date(2023, 2, 20).toISOString()
  },
  {
    id: "user-4",
    name: "Dr. Johnson",
    email: "johnson@university.edu",
    role: "hod",
    department: "Computer Science",
    createdAt: new Date(2023, 1, 5).toISOString()
  }
];

// Mock complaints
export const mockComplaints: Complaint[] = [
  {
    id: "complaint-1",
    title: "Laboratory Equipment Issues",
    description: "The computers in Lab 302 have outdated software that's affecting our project work.",
    department: "Computer Science",
    submittedBy: "user-1",
    status: "pending_review",
    adminReviewed: false,
    createdAt: new Date(2024, 3, 10).toISOString(),
    updatedAt: new Date(2024, 3, 10).toISOString()
  },
  {
    id: "complaint-2",
    title: "Wi-Fi Connectivity Issues",
    description: "The Wi-Fi in the library is extremely slow during peak hours, making it difficult to download course materials.",
    department: "Information Technology",
    submittedBy: "user-1",
    status: "sent_to_faculty",
    faculty: "user-3",
    adminReviewed: true,
    createdAt: new Date(2024, 3, 5).toISOString(),
    updatedAt: new Date(2024, 3, 6).toISOString()
  },
  {
    id: "complaint-3",
    title: "Course Material Access Issue",
    description: "Cannot access the course materials for CS401 on the learning portal. The links are broken.",
    department: "Computer Science",
    submittedBy: "user-1",
    status: "closed_by_faculty",
    faculty: "user-3",
    facultyResponse: {
      message: "The issue has been fixed. All materials are now accessible on the portal.",
      date: new Date(2024, 3, 8).toISOString()
    },
    adminReviewed: true,
    createdAt: new Date(2024, 3, 1).toISOString(),
    updatedAt: new Date(2024, 3, 8).toISOString()
  },
  {
    id: "complaint-4",
    title: "Classroom Ventilation Problem",
    description: "Room 105 has poor ventilation, making it uncomfortable during long lectures.",
    department: "Mechanical Engineering",
    submittedBy: "user-1",
    status: "forwarded_to_hod",
    faculty: "user-3",
    hod: "user-4",
    facultyResponse: {
      message: "This requires infrastructure changes beyond my authority. Forwarding to HOD.",
      date: new Date(2024, 3, 7).toISOString()
    },
    adminReviewed: true,
    createdAt: new Date(2024, 2, 28).toISOString(),
    updatedAt: new Date(2024, 3, 7).toISOString()
  },
  {
    id: "complaint-5",
    title: "Grading Discrepancy",
    description: "My project grade for CS301 doesn't reflect the rubric criteria. I believe there's a calculation error.",
    department: "Computer Science",
    submittedBy: "user-1",
    status: "resolved",
    faculty: "user-3",
    hod: "user-4",
    facultyResponse: {
      message: "After reviewing the project, the grade has been adjusted according to the rubric.",
      date: new Date(2024, 2, 25).toISOString()
    },
    adminReviewed: true,
    createdAt: new Date(2024, 2, 20).toISOString(),
    updatedAt: new Date(2024, 2, 25).toISOString()
  },
  {
    id: "complaint-6",
    title: "Inappropriate Conduct",
    description: "This is a false complaint with no specific details or evidence.",
    department: "Business Administration",
    submittedBy: "user-1",
    status: "rejected",
    adminReviewed: true,
    createdAt: new Date(2024, 2, 15).toISOString(),
    updatedAt: new Date(2024, 2, 16).toISOString()
  }
];

// Mock tracking codes
export const mockTrackingCodes: TrackingCode[] = [
  {
    id: "tracking-1",
    complaintId: "complaint-1",
    code: "TRACK123",
    email: "john@university.edu",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
  },
  {
    id: "tracking-2",
    complaintId: "complaint-2",
    code: "TRACK456",
    email: "john@university.edu",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "tracking-3",
    complaintId: "complaint-3",
    code: "TRACK789",
    email: "john@university.edu",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "tracking-4",
    complaintId: "complaint-4",
    code: "TRACK012",
    email: "john@university.edu",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "tracking-5",
    complaintId: "complaint-5",
    code: "TRACK345",
    email: "john@university.edu",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "tracking-6",
    complaintId: "complaint-6",
    code: "TRACK678",
    email: "john@university.edu",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  }
];
