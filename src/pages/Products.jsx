import React, { useEffect, useState } from "react";
import { useData } from "../context/DataContext";
import FilterSection from "../components/FilterSection";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Lottie from "lottie-react";
import notFound from "../assets/Lonely404.json";
import MobileFilter from "../components/MobileFilter";

const Products = () => {
  const { data, fetchAllProducts } = useData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const filteredData = data?.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || item.category === category) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
  );

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
  };

  const dynamicPage = Math.ceil(filteredData?.length / 8);

  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <MobileFilter
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          search={search}
          setSearch={setSearch}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          category={category}
          setCategory={setCategory}
          handleCategoryChange={handleCategoryChange}
        />
        {data?.length > 0 ? (
          <>
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

              {/* If no filtered products */}
              {filteredData.length === 0 ? (
                <div className="flex flex-col justify-center items-center md:h-[600px] md:w-[900px]">
                  <Lottie animationData={notFound} classID="w-[500px]" />
                  <p className="text-gray-600 text-lg mt-1 text-center px-4">
                    No products found.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-7 w-full">
                  {filteredData
                    ?.slice(page * 8 - 8, page * 8)
                    .map((product, index) => (
                      <ProductCard key={index} product={product} />
                    ))}
                </div>
              )}
            </div>

            {/* Show pagination only if products exist */}
            {filteredData.length > 0 && (
              <div className="flex justify-center mt-12">
                <Pagination
                  pageHandler={pageHandler}
                  page={page}
                  dynamicPage={dynamicPage}
                />
              </div>
            )}
          </>
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
