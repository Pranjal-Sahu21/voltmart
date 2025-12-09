import React, { useEffect, useState } from "react";
import { useData } from "../context/DataContext";
import FilterSection from "../components/FilterSection";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const { data, fetchAllProducts } = useData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const filteredData = data?.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || item.category === category) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
  );

  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {data?.length > 0 ? (
          <div className="flex gap-10">
            <div className="w-64 shrink-0 hidden lg:block">
              <FilterSection
                search={search}
                setSearch={setSearch}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                category={category}
                setCategory={setCategory}
                handleCategoryChange={handleCategoryChange}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-7 mt-auto w-full">
              {filteredData?.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[400px] text-gray-500 text-lg gap-4">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            Loading products...
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
