import { useSearchParams } from "next/navigation";
import { Button } from "../components/button";  // Ensure Button is imported

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  
  // Extract query params using searchParams
  const category = searchParams.get("category");
  const startDate = searchParams.get("startDate");
  const deadline = searchParams.get("deadline");
  const notes = searchParams.get("notes");
  const url = searchParams.get("url");
  const status = searchParams.get("status");
  const additionalDetails = searchParams.get("additionalDetails");

  const handleDelete = () => {
    // Handle delete functionality
    console.log("Deleting task...");
  };

  const handleSave = () => {
    // Handle save functionality
    console.log("Saving task...");
  };

  return (
    <div className="confirmation-container">
      <h2>Task Confirmation</h2>
      <p><strong>Category:</strong> {category}</p>
      <p><strong>Start Date:</strong> {startDate}</p>
      <p><strong>Deadline:</strong> {deadline}</p>
      <p><strong>Notes:</strong> {notes}</p>
      <p><strong>URL:</strong> {url}</p>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Additional Details:</strong> {additionalDetails}</p>

      <div>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
}
