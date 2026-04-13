import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Skeleton from "../components/Skeleton";

export default function Products() {
  const [allProducts, setAllProducts] = useState([]); // Master list (never filtered)
  const [displayProducts, setDisplayProducts] = useState([]); // List shown to user
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sort: "",
  });

  // 1. Initial Load: Fetch everything once
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [prodRes, catRes] = await Promise.all([
          axios.get("https://dummyjson.com/products?limit=0"),
          axios.get("https://dummyjson.com/products/categories"),
        ]);
        setAllProducts(prodRes.data.products);
        setDisplayProducts(prodRes.data.products);
        setCategories(catRes.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. Client-side Filter & Sort (Instant & Title-Only)
  useEffect(() => {
    let filtered = [...allProducts];

    // Filter by Title ONLY (Case Insensitive)
    if (filters.search.trim()) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    // Filter by Category
    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    // Sort Logic
    if (filters.sort === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setDisplayProducts(filtered);
  }, [filters, allProducts]);

  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <div className="py-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight text-center">
          Explore Products
        </h1>
        <p className="text-gray-500 mt-2 font-medium text-center">
          Discover our latest collection of premium quality items.
        </p>
      </div>
      <div className="mt-8 border-b border-gray-300 w-full"></div>
      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <input
          type="text"
          value={filters.search}
          placeholder="Search Product"
          className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <select
          value={filters.category}
          className="px-4 py-2 border border-gray-200 rounded-xl  outline-blue-500"
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          value={filters.sort}
          className="px-4 py-2 border border-gray-200 rounded-xl outline-blue-500"
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        >
          <option value="">Sort By Price</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array(12)
              .fill(0)
              .map((_, i) => <Skeleton key={i} />)
          : displayProducts.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>

      {!loading && displayProducts.length === 0 && (
        <div className="text-center py-20 text-gray-500 font-bold text-xl">
          No Product Found "{filters.search}"
        </div>
      )}
    </div>
  );
}
