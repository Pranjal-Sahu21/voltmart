export const CarouselSkeleton = () => {
  return (
    <div className="px-3 h-full">
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden h-full flex">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6 sm:p-10 w-full animate-pulse">
          {/* TEXT */}
          <div className="space-y-4">
            <div className="h-3 w-24 bg-gray-200 rounded"></div>

            <div className="h-8 w-3/4 bg-gray-200 rounded mt-8"></div>

            <div className="h-4 w-full bg-gray-200 rounded mt-10"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>

            <div className="h-10 w-32 bg-gray-200 rounded-full mt-6"></div>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center">
            <div className="h-[260px] sm:h-[340px] w-[220px] bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
