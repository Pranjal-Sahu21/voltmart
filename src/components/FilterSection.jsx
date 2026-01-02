import React from "react";
import { useProductsData } from "../context/DataContext";
import Slider from "rc-slider";

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
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={category === ""}
            onChange={() => setCategory("")}
            className="w-4 h-4 accent-black"
          />
          <span className="uppercase text-neutral-700">All</span>
        </label>

        {productCategories?.map((item, index) => (
          <label key={index} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={category === item}
              value={item}
              onChange={handleCategoryChange}
              className="w-4 h-4 accent-black"
            />
            <span className="uppercase text-neutral-700">{item}</span>
          </label>
        ))}
      </div>

      {/* PRICE RANGE */}
      <h1 className="mt-10 font-semibold text-lg text-black">Price Range</h1>

      <div className="mt-4">
        <p className="text-sm text-neutral-600 mb-3">
          ${priceRange[0]} — ${priceRange[1]}
        </p>

        <Slider
          range
          min={0}
          max={1000}
          value={priceRange}
          onChange={(value) => setPriceRange(value)}
          trackStyle={[{ backgroundColor: "black" }]}
          handleStyle={[{ borderColor: "black" }, { borderColor: "black" }]}
          railStyle={{ backgroundColor: "#e5e7eb" }}
        />
      </div>

      {/* Reset */}
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
