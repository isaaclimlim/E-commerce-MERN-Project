import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ShopFiltering from "./ShopFiltering";
import { useFetchAllProductsQuery } from "../../redux/features/product/productApi";

const filter = {
  categories: ["all", "accessories", "dress", "jewellary", "cosmetics"],
  colors: ["all", "black", "red", "gold", "blue", "silver", "beige", "green"],
  priceRanges: [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 and above", min: 200, max: Infinity },
  ],
};

const ShopPage = () => {
  const [filterState, setFiltersState] = useState({
    category: "all",
    color: "all",
    priceRange: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  const { category, color, priceRange } = filterState;

  // Extract minPrice and maxPrice safely
  const [minPrice, maxPrice] = priceRange
    ? priceRange.split("-").map(Number)
    : [undefined, undefined];

  const { data: productsData = {}, isLoading, error } = useFetchAllProductsQuery({
    category: category !== "all" ? category : undefined,
    color: color !== "all" ? color : undefined,
    minPrice: isNaN(minPrice) ? undefined : minPrice,
    maxPrice: isNaN(maxPrice) ? undefined : maxPrice,
    page: currentPage,
    limit: productsPerPage,
  });

  const { products = [], totalPages = 1, totalProducts = 0 } = productsData;

  // Clear filters
  const clearFilters = () => {
    setFiltersState({
      category: "all",
      color: "all",
      priceRange: "",
    });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = Math.min(startProduct + products.length - 1, totalProducts);

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Welcome to Our Shop</h2>
        <p className="section__subheader">
          Discover an exceptional collection curated just for you. From timeless
          classics to the latest trends, explore a world of quality products
          designed to elevate your style and meet your everyday needs. Happy
          shopping!
        </p>
      </section>

      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          {/* Left side */}
          <ShopFiltering
            filters={filter}
            filterState={filterState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
          />
          {/* Right side */}
          <div>
            <h3 className="text-xl font-medium mb-4">
              Available products: {startProduct} - {endProduct} of {totalProducts}
            </h3>
            <ProductCard products={products} />
            {/* Pagination controls */}
            <div className="mt-6 flex justify-center">
              <button
                className={`px-4 py-2 rounded-md mr-2 ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-300 text-gray-700"
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-md mx-1 ${
                    currentPage === index + 1
                      ? "bg-black text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className={`px-4 py-2 rounded-md ml-2 ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-300 text-gray-700"
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
