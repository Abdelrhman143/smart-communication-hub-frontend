// Small spinner - Compact loading indicator for inline use (smaller than LoadingSpinner)
export default function SmallSpinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-6 h-6 border-4 border-gray-300 border-t-MainColor rounded-full animate-spin"></div>
    </div>
  );
}
