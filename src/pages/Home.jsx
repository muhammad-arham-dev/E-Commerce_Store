import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Skeleton from '../components/Skeleton';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Palette } from 'lucide-react'; // Import icons

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=8').then(res => {
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-12 pb-20">
      
      {/* --- HERO BANNER --- */}
      <section className="relative h-[80vh] min-h-125 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Background Image & Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://i.pinimg.com/1200x/f8/37/1e/f8371e9741e30ec7103b4f474e6bd06d.jpg" // Place your fashion image in /public folder
            alt="Hero Fashion"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay to make text readable */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Central Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight max-w-4xl">
            Timeless Fashion for the Modern Wardrobe
          </h1>
          <p className="text-lg md:text-xl font-medium mb-10 opacity-90 max-w-2xl leading-relaxed">
            Discover timeless fashion for Men, Women, and Kids – crafted for comfort, designed for confidence.
          </p>
          <button 
            onClick={() => navigate('/products')} 
            className="bg-gray-800 text-white px-10 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-blue-400 transition-all duration-300 active:scale-95 shadow-lg shadow-black/20"
          >
            Explore the Collection
          </button>
        </div>
      </section>
      {/* --- HERO BANNER END --- */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? [...Array(8)].map((_, i) => <Skeleton key={i} />) : products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}