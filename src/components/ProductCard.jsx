import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { RotateCcw, Info, ExternalLink } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="group h-112.5 perspective-[1000px]">
      <div 
        className={`relative h-full w-full rounded-3xl transition-all duration-700 transform-3d ${isFlipped ? 'transform-[rotateY(180deg)]' : ''}`}
      >
        {/* FRONT SIDE */}
        <div className="absolute inset-0 h-full w-full rounded-3xl bg-gray-200 p-4 backface-hidden border border-gray-300 shadow-sm flex flex-col">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50">
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              className="w-full h-full object-contain cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            />
            {/* Flip Trigger */}
            <button 
              onClick={() => setIsFlipped(true)}
              className="absolute top-3 right-3 p-2 bg-white shadow-md rounded-full text-gray-700 hover:bg-blue-400 hover:text-white transition-all z-10"
            >
              <Info size={18} />
            </button>
          </div>
          
          <div className="mt-4 flex-1 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
            <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">{product.category}</p>
            <h3 className="font-bold text-gray-800 line-clamp-1 mt-1 group-hover:text-blue-400 transition-colors">{product.title}</h3>
            <p className="text-2xl font-black text-gray-900 mt-2">${product.price}</p>
          </div>

          <button 
            onClick={() => addToCart(product)}
            className="mt-4 w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold hover:bg-blue-400 active:scale-95 transition-all shadow-lg shadow-gray-100"
          >
            Add to Cart
          </button>
        </div>

        {/* BACK SIDE (Quick Details) */}
        <div className="absolute inset-0 h-full w-full rounded-3xl bg-gray-900 p-6 text-white transform-[rotateY(180deg)] backface-hidden flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex justify-between items-start border-b border-gray-800 pb-4">
              <h3 className="font-bold text-blue-400 leading-tight pr-4">{product.title}</h3>
              <button onClick={() => setIsFlipped(false)} className="text-gray-400 hover:text-white">
                <RotateCcw size={20} />
              </button>
            </div>
            
            <p className="mt-4 text-sm text-gray-400 leading-relaxed line-clamp-5">
              {product.description}
            </p>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs"><span className="text-gray-500">Brand</span><span className="font-bold">{product.brand}</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-500">Rating</span><span className="font-bold text-yellow-400">★ {product.rating}</span></div>
            </div>
          </div>

          <div className="space-y-3">
            {/* Navigation Trigger on Back Side */}
            <button 
              onClick={() => navigate(`/product/${product.id}`)}
              className="w-full flex items-center justify-center gap-2 bg-white/10 text-white py-3 rounded-xl font-bold hover:bg-white/20 border border-white/10 transition-all"
            >
              Full Details <ExternalLink size={16} />
            </button>
            
            <button 
              onClick={() => { addToCart(product); setIsFlipped(false); }}
              className="w-full bg-blue-400 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}