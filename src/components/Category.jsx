import { useEffect, useState } from "react";
import { useData } from "../context/DataContext";

const Category = () => {
  const {categoryOnlyData} = useData();

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-3 sm:gap-4 items-center justify-around py-6 px-4">
        {categoryOnlyData?.map((item, index) => (
          <button
            key={index}
            className="uppercase text-xs sm:text-sm tracking-wide font-medium text-gray-700 bg-gray-100 px-5 py-2.5 rounded-full border hover:border-gray-300 hover:bg-white hover:text-gray-900 transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
