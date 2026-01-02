import React from "react";
import { FaFilter } from "react-icons/fa6";
import { useProductsData } from "../context/DataContext";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Slider from "rc-slider";

const MobileFilter = ({
  openFilter,
  setOpenFilter,
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
    <>
      <div
        className={`bg-gray-100 flex justify-between items-center lg:hidden -mt-6 p-3 ${
          openFilter ? "rounded-tl-md rounded-tr-md" : "mb-4 rounded-md"
        }`}
      >
        <h1 className="font-semibold text-lg">Filters</h1>
        {openFilter ? (
          <X
            onClick={() => setOpenFilter((prev) => !prev)}
            className="text-black text-lg"
          />
        ) : (
          <FaFilter
            onClick={() => setOpenFilter((prev) => !prev)}
            className="text-gray-800 text-lg"
          />
        )}
      </div>

      {/* AnimatePresence handles mount/unmount animation */}
      <AnimatePresence>
        {openFilter && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={`bg-gray-100 p-3 lg:hidden overflow-hidden mb-4 ${
              openFilter ? "rounded-bl-md rounded-br-md" : ""
            }`}
          >
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
                  checked={category === ""}
                  onChange={() => {
                    setCategory("");
                    setOpenFilter((prev) => !prev);
                  }}
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

            {/* Price Range */}
            <h1 className="mt-10 font-semibold text-lg text-black">
              Price Range
            </h1>

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
                handleStyle={[
                  { borderColor: "black" },
                  { borderColor: "black" },
                ]}
                railStyle={{ backgroundColor: "#e5e7eb" }}
              />
            </div>

            <button
              className="w-full bg-black text-white font-medium py-3 rounded-lg hover:bg-neutral-800 transition-all shadow-md hover:shadow-lg cursor-pointer active:scale-95 mt-12"
              onClick={() => {
                setSearch("");
                setCategory("");
                setPriceRange([0, 1000]);
                setOpenFilter((prev) => !prev);
              }}
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileFilter;
