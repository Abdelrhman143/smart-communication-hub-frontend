// Dashboard root page - Shows loading spinner, redirects to specific chat when user selected
import LoadingSpinner from "../_components/LoadingSpinner";

export default function page() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
