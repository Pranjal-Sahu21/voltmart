import React from "react";
import { useProductsData } from "../context/DataContext";

const FilterSection = ({
  search,
  setSearch,
  priceRange,
  setPriceRange,
  category,
  setCategory,
  handleCategoryChange,
}) => {
  const { productCategories } = useProductsData();

  return (
    <div className="bg-gray-100 mt-1 p-4 rounded-xl border border-neutral-200 shadow-sm h-max w-full">
      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-white p-2 rounded-md border border-neutral-300 
        focus:outline-none focus:ring-1 focus:ring-black transition"
      />

      {/* Category */}
      <h1 className="mt-10 font-semibold text-lg text-black">Category</h1>

      <div className="flex flex-col gap-3 mt-3">
        {/* ALL CATEGORY */}
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="all"
            checked={category === ""} // or category === "all"
            onChange={() => setCategory("")}
            className="w-4 h-4 accent-black border-neutral-400 rounded"
          />
          <span className="uppercase text-neutral-700 group-hover:text-black transition">
            All
          </span>
        </label>

        {/* OTHER CATEGORIES */}
        {productCategories?.map((item, index) => (
          <label
            key={index}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              name={item}
              checked={category === item}
              value={item}
              onChange={handleCategoryChange}
              className="w-4 h-4 accent-black border-neutral-400 rounded"
            />
            <span className="uppercase text-neutral-700 group-hover:text-black transition">
              {item}
            </span>
          </label>
        ))}
      </div>
      {/*Price Range  */}
      <h1 className="mt-10 font-semibold text-lg text-black">Price Range</h1>

      <div className="flex flex-col gap-3">
        <label className="text-sm text-neutral-600 mt-4">
          Price Range: ${priceRange[0]} — ${priceRange[1]}
        </label>

        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
          className="
        w-full h-2 rounded-lg  cursor-pointer 
    bg-neutral-200 
      accent-black 
      [&::-webkit-slider-thumb]:appearance-none 
      [&::-webkit-slider-thumb]:h-4 
      [&::-webkit-slider-thumb]:w-4 
      [&::-webkit-slider-thumb]:rounded-full 
      [&::-webkit-slider-thumb]:bg-black 
      [&::-webkit-slider-thumb]:cursor-pointer 
      [&::-webkit-slider-thumb]:transition-all
      [&::-webkit-slider-thumb]:hover:scale-110"
        />
      </div>
      <button
        className="w-full bg-black text-white font-medium py-3 rounded-lg hover:bg-neutral-800 transition-all shadow-md hover:shadow-lg cursor-pointer active:scale-95 mt-12"
        onClick={() => {
          setSearch("");
          setCategory("");
          setPriceRange([0, 1000]);
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSection;
