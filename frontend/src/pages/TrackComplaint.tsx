
import { TrackingForm } from "@/components/complaints/TrackingForm";

export default function TrackComplaint() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-center mb-8">
        Track Your Complaint
      </h1>
      <TrackingForm />
    </div>
  );
}
