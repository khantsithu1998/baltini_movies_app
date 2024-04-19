import React from "react";

function MovieCardSkeleton() {
  return (
    <div className="p-4 bg-gray-200 rounded-lg mb-4">
      <div className="w-full h-56 bg-gray-300 rounded-md"></div>
      <div className="mt-2 w-3/4 h-4 bg-gray-300 rounded"></div>
      <div className="mt-1 w-1/2 h-4 bg-gray-300 rounded"></div>
      <div className="mt-1 w-1/4 h-4 bg-gray-300 rounded"></div>
    </div>
  );
}

export default MovieCardSkeleton;
