
import { Complaint, ComplaintStatus, TrackingCode } from "@/types";
import { mockComplaints, mockTrackingCodes } from "../mock-data";

// Get complaint by ID
export const getComplaintById = (id: string): Complaint | undefined => {
  return mockComplaints.find(complaint => complaint.id === id);
};

// Get complaint by tracking code
export const getComplaintByTrackingCode = (code: string): Complaint | undefined => {
  const trackingCode = mockTrackingCodes.find(tc => tc.code === code);
  if (!trackingCode) return undefined;
  
  // Check if tracking code is expired
  if (new Date(trackingCode.expiresAt) < new Date()) return undefined;
  
  return getComplaintById(trackingCode.complaintId);
};

// Get complaints by status
export const getComplaintsByStatus = (status: ComplaintStatus): Complaint[] => {
  return mockComplaints.filter(complaint => complaint.status === status);
};

// Get complaints for faculty
export const getComplaintsForFaculty = (facultyId: string): Complaint[] => {
  return mockComplaints.filter(complaint => complaint.faculty === facultyId);
};

// Get complaints for HOD
export const getComplaintsForHOD = (hodId: string): Complaint[] => {
  return mockComplaints.filter(complaint => 
    complaint.hod === hodId || 
    complaint.status === 'forwarded_to_hod'
  );
};

// Get complaints by department
export const getComplaintsByDepartment = (department: string): Complaint[] => {
  return mockComplaints.filter(complaint => complaint.department === department);
};

// Get complaints for student
export const getComplaintsForStudent = (studentId: string): Complaint[] => {
  return mockComplaints.filter(complaint => complaint.submittedBy === studentId);
};

// Generate a random tracking code (would be more complex in production)
export const generateTrackingCode = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'TRACK';
  for (let i = 0; i < 5; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

// Get tracking codes for a complaint
export const getTrackingCodesForComplaint = (complaintId: string): TrackingCode[] => {
  return mockTrackingCodes.filter(tc => tc.complaintId === complaintId);
};

// Format complaint status for display
export const formatComplaintStatus = (status: ComplaintStatus): string => {
  switch (status) {
    case 'pending_review':
      return 'Pending Admin Review';
    case 'sent_to_faculty':
      return 'Sent to Faculty';
    case 'closed_by_faculty':
      return 'Resolved by Faculty';
    case 'forwarded_to_hod':
      return 'Escalated to HOD';
    case 'resolved':
      return 'Resolved';
    case 'rejected':
      return 'Rejected';
    default:
      return 'Unknown Status';
  }
};

// Get status color based on complaint status
export const getStatusColor = (status: ComplaintStatus): string => {
  switch (status) {
    case 'pending_review':
      return '#f59e0b'; // Amber
    case 'sent_to_faculty':
      return '#3b82f6'; // Blue
    case 'closed_by_faculty':
    case 'resolved':
      return '#10b981'; // Green
    case 'forwarded_to_hod':
      return '#8b5cf6'; // Purple
    case 'rejected':
      return '#ef4444'; // Red
    default:
      return '#6b7280'; // Gray
  }
};

// Check if a complaint can be updated by a user with specific role
export const canUpdateComplaint = (
  complaint: Complaint, 
  userRole: 'admin' | 'faculty' | 'hod'
): boolean => {
  switch (userRole) {
    case 'admin':
      return complaint.status === 'pending_review';
    case 'faculty':
      return complaint.status === 'sent_to_faculty';
    case 'hod':
      return complaint.status === 'forwarded_to_hod';
    default:
      return false;
  }
};

// Get the timeline events for a complaint
export const getComplaintTimeline = (complaint: Complaint): { date: string; title: string; description: string }[] => {
  const timeline = [
    {
      date: complaint.createdAt,
      title: 'Complaint Submitted',
      description: 'Complaint was submitted and is awaiting review.'
    }
  ];

  if (complaint.adminReviewed) {
    timeline.push({
      date: complaint.updatedAt,
      title: complaint.status === 'rejected' ? 'Complaint Rejected' : 'Complaint Reviewed',
      description: complaint.status === 'rejected' 
        ? 'Complaint was reviewed and rejected by admin.'
        : 'Complaint was reviewed and sent to faculty.'
    });
  }

  if (complaint.facultyResponse) {
    timeline.push({
      date: complaint.facultyResponse.date,
      title: complaint.status === 'closed_by_faculty' ? 'Resolved by Faculty' : 'Escalated by Faculty',
      description: complaint.facultyResponse.message
    });
  }

  if (complaint.status === 'resolved' && complaint.hod) {
    timeline.push({
      date: complaint.updatedAt,
      title: 'Resolved by HOD',
      description: 'Final resolution provided by the Head of Department.'
    });
  }

  return timeline.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
