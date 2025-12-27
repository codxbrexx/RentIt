export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
      <div className="relative h-64 bg-gray-200 animate-pulse"></div>
      <div className="p-5">
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-3 w-3/4"></div>
        <div className="flex items-center gap-1.5 mb-4">
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
        </div>
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-5 bg-gray-200 rounded animate-pulse w-20"></div>
          <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
        </div>
      </div>
    </div>
  );
}
