
import { Complaint } from "@/types";
import { getComplaintTimeline } from "@/lib/utils/complaint-utils";

interface ComplaintTimelineProps {
  complaint: Complaint;
}

export function ComplaintTimeline({ complaint }: ComplaintTimelineProps) {
  const timeline = getComplaintTimeline(complaint);

  return (
    <div className="space-y-4">
      {timeline.map((event, index) => (
        <div key={index} className="relative pl-6 pb-4">
          {/* Timeline connector */}
          {index < timeline.length - 1 && (
            <div className="absolute left-2 top-3 bottom-0 w-0.5 bg-border" />
          )}
          
          {/* Timeline dot */}
          <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-primary" />
          
          {/* Event content */}
          <div>
            <h4 className="font-medium">{event.title}</h4>
            <p className="text-sm text-muted-foreground mb-1">
              {new Date(event.date).toLocaleString()}
            </p>
            <p className="text-sm">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
