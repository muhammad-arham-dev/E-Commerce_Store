import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // active link styling
  const navStyles = ({ isActive }) => 
    `transition-colors ${isActive ? 'text-blue-400 font-bold' : 'text-white hover:text-blue-400'}`;

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 backdrop-blur-md px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        
        {/* Left: Logo Section */}
        <div className="flex-1">
          <Link to="/" className="text-2xl font-bold bg-linear-to-r from-white to-blue-400 bg-clip-text text-transparent">
            E-Commerce Store
          </Link>
        </div>

        {/* Center: Desktop Navigation Links (Hidden on mobile) */}
        <div className="hidden md:flex gap-8 items-center font-medium">
          <NavLink to="/" className={navStyles}>Home</NavLink>
          <NavLink to="/products" className={navStyles}>Products</NavLink>
        </div>

        {/* Right: Cart & Mobile Toggle */}
        <div className="flex-1 flex justify-end items-center gap-4">
          {/* Cart NavLink now uses the same navStyles for active highlighting */}
          <NavLink to="/cart" className={(state) => `relative flex items-center ${navStyles(state)}`}>
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white transition-colors hover:text-blue-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-900 border-t border-gray-800 p-6 flex flex-col gap-6 font-medium shadow-2xl">
          <NavLink 
            to="/" 
            onClick={() => setIsOpen(false)} 
            className={navStyles}
          >
            Home
          </NavLink>
          <NavLink 
            to="/products" 
            onClick={() => setIsOpen(false)} 
            className={navStyles}
          >
            Products
          </NavLink>
        </div>
      )}
    </nav>
  );
}