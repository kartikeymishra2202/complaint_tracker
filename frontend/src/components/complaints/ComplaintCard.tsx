import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Complaint } from "@/types";
import { ComplaintStatus } from "./ComplaintStatus";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface ComplaintCardProps {
  complaint: Complaint;
  showActions?: boolean;
}

export function ComplaintCard({
  complaint,
  showActions = true,
}: ComplaintCardProps) {
  const navigate = useNavigate();

  const timeAgo = complaint.createdAt
    ? formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true })
    : "Time not available";

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-grow pt-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold truncate mr-2">{complaint.title}</h3>
          <ComplaintStatus status={complaint.status} />
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {complaint.description}
        </p>

        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="bg-muted px-2 py-1 rounded">
            {complaint.department}
          </span>
          <span className="bg-muted px-2 py-1 rounded">{timeAgo}</span>
        </div>
      </CardContent>

      {showActions && (
        <CardFooter className="border-t pt-4">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => navigate(`/complaints/${complaint._id}`)}
          >
            View Details
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
