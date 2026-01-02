import { useEffect, useState } from "react";
import { useProductsData } from "../context/DataContext";
import FilterSection from "../components/FilterSection";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Lottie from "lottie-react";
import notFound from "../assets/Lonely404.json";
import MobileFilter from "../components/MobileFilter";

const ITEMS_PER_PAGE = 6;

const Products = () => {
  const { products } = useProductsData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setOpenFilter(false);
  };

  const filteredProducts = products?.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || item.category === category) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
  );

  const maxPage = Math.ceil(filteredProducts?.length / ITEMS_PER_PAGE) || 1;

  const currentPage = Math.min(page, maxPage);

  const paginatedProducts = filteredProducts?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Mobile filter panel */}
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

        {products?.length > 0 ? (
          <>
            <div className="flex gap-10">
              {/* Desktop filter */}
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

              {/* Product list */}
              {filteredProducts.length === 0 ? (
                <div className="flex flex-col justify-center items-center md:h-[600px] md:w-[900px]">
                  <Lottie animationData={notFound} className="w-[500px]" />
                  <p className="text-gray-600 text-lg mt-1 text-center px-4">
                    No products found.
                  </p>
                </div>
              ) : (
                <div className="grid xs:grid-cols-2 sm:grid-cols-3 gap-2 md:gap-7 w-full">
                  {paginatedProducts.map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredProducts.length > ITEMS_PER_PAGE && (
              <div className="flex justify-center mt-12">
                <Pagination
                  pageHandler={pageHandler}
                  page={currentPage}
                  dynamicPage={maxPage}
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
