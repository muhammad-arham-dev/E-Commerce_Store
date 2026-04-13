import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (cart.length === 0) return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 mt-20">
    <div className="max-w-md w-full bg-gray-700 border border-gray-100 p-12 rounded-[3rem] shadow-xl shadow-gray-100/50 text-center space-y-8">
      <div className="relative mx-auto w-24 h-24 bg-blue-50 rounded-4xl flex items-center justify-center text-blue-600">
        <ShoppingBag size={48} strokeWidth={1.5} />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-4 border-white"></div>
      </div>

      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-blue-400 tracking-tight">
          Your cart is empty
        </h2>
        <p className="text-gray-200 font-medium leading-relaxed">
          Looks like you haven't added anything to your cart yet. Let's find some amazing products for you!
        </p>
      </div>

      <Link 
        to="/products" 
        className="group flex items-center justify-center gap-2 w-full bg-gray-900 text-gray-200 py-5 rounded-2xl font-bold text-lg hover:bg-blue-400 transition-all shadow-sm  active:scale-[0.98]"
      >
        Start Shopping
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  </div>
);

  return (
    <div className="flex flex-col gap-8 pb-20">
      <div className="py-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight text-center">
          Cart Items
        </h1>
        <p className="text-gray-500 mt-2 font-medium text-center">
          Manage your selected items and proceed to a secure checkout.
        </p>
      </div>
      <div className="mt-8 border-b border-gray-300 w-full"></div>
      
      <div className="space-y-4">
        {cart.map(item => (
          <div key={item.id} className="flex flex-col md:flex-row md:items-center gap-6 bg-white p-6 rounded-4xl border border-gray-300 shadow-sm">
            
            {/* Top Section: Centered on mobile, Left-aligned on desktop */}
            <div className="flex flex-col items-center md:items-start md:flex-row gap-4 flex-1 text-center md:text-left">
              <img src={item.thumbnail} className="w-24 h-24 object-cover rounded-2xl bg-gray-100" alt={item.title} />
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                <p className="text-xs text-gray-400 uppercase font-black mt-1">{item.category}</p>
              </div>
            </div>

            {/* Bottom Section: Single row on mobile, end-aligned on desktop */}
            <div className="flex items-center justify-between md:justify-end gap-4 md:gap-10 border-t md:border-t-0 pt-4 md:pt-0">
              <div className="text-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Price</p>
                <p className="font-black text-gray-900 text-sm md:text-base">${item.price}</p>
              </div>

              <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1.5 border border-gray-200">
                <button 
                  onClick={() => updateQuantity(item.id, -1)} 
                  className="p-1 hover:bg-white rounded-lg transition-all"
                >
                  <Minus size={14}/>
                </button>
                <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, 1)} 
                  className="p-1 hover:bg-white rounded-lg transition-all"
                >
                  <Plus size={14}/>
                </button>
              </div>

              <div className="text-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Total</p>
                <p className="font-black text-green-400 text-sm md:text-base">${(item.price * item.quantity).toFixed(2)}</p>
              </div>

              <button 
                onClick={() => removeFromCart(item.id)} 
                className="text-red-500 p-2 hover:bg-red-50 rounded-xl transition-colors"
              >
                <Trash2 size={18}/>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-white p-8 rounded-[2.5rem] border border-gray-300 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-gray-500 font-bold">Total Amount</p>
            <h2 className="text-4xl font-black text-gray-900">${cartTotal.toFixed(2)}</h2>
          </div>
          
          <Link 
            to="/checkout" 
            className="bg-gray-900 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-blue-400 shadow-sm shadow-blue-100 transition-all active:scale-95 text-center"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}