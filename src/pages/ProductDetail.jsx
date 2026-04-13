import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import {
  Star,
  Package,
  ShieldCheck,
  Truck,
  RefreshCcw,
  ChevronLeft,
  Plus,
  Minus,
} from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`https://dummyjson.com/products/${id}`).then((res) => {
      setProduct(res.data);
      setActiveImage(res.data.images[0]);
      setLoading(false);
    });
  }, [id]);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 pb-20">
      {/* Page Heading */}
      <div className="py-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight text-center">
          Product Detail
        </h1>
        <p className="text-gray-500 mt-2 font-medium text-center">
          Experience premium craftsmanship and modern design in every detail.
        </p>
      </div>
      <div className="mt-8 border-b border-gray-300 w-full"></div>
      <button
        onClick={() => navigate(-1)}
        className="group flex items-center gap-2 px-4 py-2 text-gray-100 border border-gray-300 rounded-xl bg-gray-900 hover:bg-blue-400 transition-all duration-300 font-bold mb-6 active:scale-95 w-fit"
      >
        <ChevronLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform duration-300"
        />
        <span>Back to Products</span>
      </button>

      <div className="grid lg:grid-cols-2 gap-12 bg-gray-200 p-6 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-300">
        {/* Left: Image Gallery */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-4xl p-8 flex items-center justify-center border border-gray-50 h-100 md:h-137.5 overflow-hidden">
            <img
              src={activeImage}
              alt={product.title}
              className="max-h-full object-contain transition-all duration-500 transform hover:scale-105"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={`shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl border-2 transition-all p-2 bg-gray-50 ${
                  activeImage === img
                    ? "border-blue-600 bg-white shadow-md"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  className="w-full h-full object-contain"
                  alt={`view-${i}`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col justify-center">
          <div className="border-b border-gray-100 pb-6">
            <span className="bg-blue-50 text-blue-400 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight">
              {product.title}
            </h1>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center text-yellow-500 font-bold px1 py-1 rounded-lg">
                <Star size={18} fill="currentColor" className="mr-1" />{" "}
                {product.rating}
              </div>
              <span className="text-gray-400">|</span>
              <span
                className={`font-bold ${product.stock < 10 ? "text-red-500" : "text-green-600"}`}
              >
                {product.availabilityStatus} ({product.stock} units)
              </span>
            </div>
          </div>

          <div className="py-8">
            <div className="text-5xl font-extrabold text-gray-900 tracking-tight">
              ${product.price}
            </div>
            <p className="text-gray-600 mt-6 leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-y-6 gap-x-4 py-8 border-y border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-400">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-black">
                  Warranty
                </p>
                <p className="font-bold text-sm text-gray-800">
                  {product.warrantyInformation}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-400">
                <Truck size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-black">
                  Shipping
                </p>
                <p className="font-bold text-sm text-gray-800">
                  {product.shippingInformation}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-400">
                <Package size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-black">
                  Dimensions
                </p>
                <p className="font-bold text-sm text-gray-800">
                  {product.dimensions.width}W x {product.dimensions.height}H
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-400">
                <RefreshCcw size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-black">
                  Returns
                </p>
                <p className="font-bold text-sm text-gray-800">
                  {product.returnPolicy}
                </p>
              </div>
            </div>
          </div>

          {/* Quantity and Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 rounded-xl">
            <div className="flex items-center justify-center bg-white rounded-2xl border border-gray-300 p-1 w-full sm:w-auto">
              <button
                onClick={decrement}
                className="p-4 hover:bg-gray-300 rounded-lg shadow-sm transition-all"
              >
                <Minus size={20} />
              </button>
              <span className="w-12 text-center font-bold text-xl text-gray-900">
                {quantity}
              </span>
              <button
                onClick={increment}
                className="p-4 hover:bg-gray-300 rounded-lg shadow-sm transition-all"
              >
                <Plus size={20} />
              </button>
            </div>

            <button
              onClick={() => addToCart(product, quantity)} // Pass both product and quantity
              className="flex-1 w-full bg-gray-900 text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-400 shadow-sm shadow-blue-200 transition-all active:scale-[0.98] transform"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-gray-200 p-8 md:p-12 rounded-[2.5rem] border border-gray-300 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-10 flex items-center gap-3">
          Customer Reviews
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {product.reviews.map((rev, i) => (
            <div
              key={i}
              className="bg-gray-50 p-6 rounded-4xl border border-gray-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex text-yellow-500 mb-4">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={16}
                      fill={starIndex < rev.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <p className="text-gray-700 font-medium leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                <span className="font-bold text-gray-900 text-sm">
                  {rev.reviewerName}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(rev.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
