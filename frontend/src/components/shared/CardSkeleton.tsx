// CardSkeleton.tsx

export const CardSkeleton = () => {
  return (
    <div className="w-auto bg-white border border-gray-200 rounded-3xl animate-pulse">
      <div className="h-48 bg-gray-300 rounded-t-3xl"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="h-8 bg-teal-300 rounded mt-4"></div>
      </div>
    </div>
  );
};
