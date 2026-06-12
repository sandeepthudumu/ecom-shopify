import React, { useEffect, useState } from "react";
import { getProducts } from "../Apis/Productapi";
import { addToCart } from "../Apis/Cartapi";
import ProductCards from "../components/ProductCards";
import { useOutletContext } from "react-router-dom";
import Pagination from "../components/Pagination";
import Carousel from "../components/Carousel";


function Products() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const outletContext = useOutletContext();
  const category = outletContext?.category || "";

  const loadProducts = async () => {
    try {
      setLoading(true);

      const res = await getProducts(search || "", category || "", page);

console.log("PRODUCT RESPONSE:", res.data);

if (Array.isArray(res.data)) {
  setProducts(res.data);
  setTotalPages(1);
} else {
  setProducts(res.data.products || []);
  setTotalPages(res.data.total_pages || 1);
}
    } catch (error) {
      console.log("PRODUCT ERROR:", error.response?.data || error.message);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [category, page]);

  const handleSearch = () => {
    setPage(1);
    loadProducts();
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log("ADD CART ERROR:", error.response?.data || error.message);
      alert("Please login before adding to cart");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-9 mb-6">
      <h1 className="text-3xl font-bold text-center mb-8">
         <div className=''>
        <Carousel/>
      </div>
      </h1>

      <div className="flex justify-center gap-3 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded-lg w-80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="bg-gray-900 text-white px-6 py-2 rounded-lg"
        >
          Search
        </button>


        
      </div>

      {loading && <p className="text-center text-lg">Loading products...</p>}

      {!loading && products.length === 0 && (
        <p className="text-center">No products found</p>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      
      />
      

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
       {products.map((product) => {
  console.log("Rendering Product:", product);
console.log("Products State:", products);
console.log("Products Length:", products.length);
  return (
    <ProductCards
      key={product.id}
      product={product}
      onAddToCart={handleAddToCart}
    />
  );
})}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}

export default Products;