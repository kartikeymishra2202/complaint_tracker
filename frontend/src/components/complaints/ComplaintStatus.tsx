
import { ComplaintStatus as ComplaintStatusType } from "@/types";
import { getStatusColor, formatComplaintStatus } from "@/lib/utils/complaint-utils";
import { CheckCircle2, Clock, AlertCircle, ArrowRight, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComplaintStatusProps {
  status: ComplaintStatusType;
  className?: string;
}

export function ComplaintStatus({ status, className }: ComplaintStatusProps) {
  const statusColor = getStatusColor(status);
  const statusText = formatComplaintStatus(status);
  
  const getStatusIcon = () => {
    switch (status) {
      case 'pending_review':
        return <Clock className="h-5 w-5" />;
      case 'sent_to_faculty':
        return <ArrowRight className="h-5 w-5" />;
      case 'closed_by_faculty':
      case 'resolved':
        return <CheckCircle2 className="h-5 w-5" />;
      case 'forwarded_to_hod':
        return <AlertCircle className="h-5 w-5" />;
      case 'rejected':
        return <XCircle className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  return (
    <div 
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
        className
      )}
      style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
    >
      {getStatusIcon()}
      <span className="ml-1.5">{statusText}</span>
    </div>
  );
}
