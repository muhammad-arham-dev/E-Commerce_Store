import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, CheckCircle, AlertCircle } from 'lucide-react';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Set to null initially so the user MUST pick one
  const [paymentMethod, setPaymentMethod] = useState(null);

  useEffect(() => {
    if (cart.length === 0 && !isSuccess) {
      navigate('/products');
    }
  }, [cart, isSuccess, navigate]);

  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!form.address.trim()) newErrors.address = "Shipping address is required";
    
    // Payment Method Validation
    if (!paymentMethod) newErrors.payment = "Please select a payment method";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSuccess(true);
        clearCart();
        setTimeout(() => navigate('/'), 4000);
      }, 2000);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 bg-gray-700 rounded-[3rem] shadow-xl border border-gray-100 px-20 mt-25 shadow-gray-100/50">
        <div className="flex justify-center mb-6">
          <CheckCircle size={80} className="text-green-500 animate-bounce" />
        </div>
        <h2 className="text-4xl font-bold text-blue-400 mb-4">Order Confirmed!</h2>
        <p className="text-gray-300 text-lg mb-8">
          Thank you for shopping from our store. Your items are being prepared for shipping.
        </p>
        <div className="inline-block px-6 py-2 bg-blue-50 text-blue-400 rounded-full font-bold animate-pulse">
          Redirecting to home page...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Heading Section */}
      <div className="py-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight text-center">
          Place Order
        </h1>
        <p className="text-gray-500 mt-2 font-medium text-center">
          Provide your shipping and payment information to finalize your secure order
        </p>
      </div>
      <div className="mt-8 border-b border-gray-300 w-full"></div>

      {/* Main Checkout Grid */}
      <div className="grid lg:grid-cols-2 gap-10 pb-20">
        <form onSubmit={handlePlaceOrder} className="space-y-8">
          <section className="bg-gray-200 p-8 rounded-[2.5rem] border border-gray-300 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              Shipping Details
            </h2>
            
            <div className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Full Name"
                  className={`w-full px-5 py-4 rounded-2xl border outline-none transition-all ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-100 bg-gray-50 focus:border-blue-600'}`}
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                />
                {errors.name && <p className="text-red-500 text-xs mt-2 ml-2 font-bold flex items-center gap-1"><AlertCircle size={12}/> {errors.name}</p>}
              </div>

              <div>
                <input 
                  type="email" 
                  placeholder="Email Address"
                  className={`w-full px-5 py-4 rounded-2xl border outline-none transition-all ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-100 bg-gray-50 focus:border-blue-600'}`}
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                />
                {errors.email && <p className="text-red-500 text-xs mt-2 ml-2 font-bold flex items-center gap-1"><AlertCircle size={12}/> {errors.email}</p>}
              </div>

              <div>
                <textarea 
                  placeholder="Full Shipping Address"
                  className={`w-full px-5 py-4 rounded-2xl border outline-none h-32 transition-all ${errors.address ? 'border-red-500 bg-red-50' : 'border-gray-100 bg-gray-50 focus:border-blue-600'}`}
                  value={form.address}
                  onChange={(e) => setForm({...form, address: e.target.value})}
                ></textarea>
                {errors.address && <p className="text-red-500 text-xs mt-2 ml-2 font-bold flex items-center gap-1"><AlertCircle size={12}/> {errors.address}</p>}
              </div>
            </div>
          </section>

          <section className="bg-gray-200 p-8 rounded-[2.5rem] border border-gray-300 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              Payment Method
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {['Credit Card', 'PayPal', 'EasyPaisa', 'JazzCash'].map((method) => (
                <button 
                  key={method}
                  type="button"
                  onClick={() => {
                    setPaymentMethod(method);
                    if(errors.payment) setErrors({...errors, payment: null});
                  }}
                  className={`p-4 rounded-2xl border-2 font-bold transition-all bg-white capitalize ${paymentMethod === method ? 'border-blue-700 bg-blue-50 text-blue-400' : 'border-gray-100 text-gray-400'}`}
                >
                  {method}
                </button>
              ))}
            </div>
            {errors.payment && <p className="text-red-500 text-xs mt-2 ml-2 font-bold flex items-center gap-1"><AlertCircle size={12}/> {errors.payment}</p>}
          </section>
        </form>

        <div className="space-y-6">
          <div className="bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            
            <div className="max-h-80 overflow-y-auto mb-6 pr-6 space-y-6 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm border-b border-gray-800 pb-4">
                  <div className="flex gap-4">
                    <span className="text-blue-400 font-bold">x{item.quantity}</span>
                    <span className="text-gray-300 line-clamp-1 font-medium">{item.title}</span>
                  </div>
                  <span className="font-black text-white">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4">
              <div className="border-t border-gray-800 pt-6 flex justify-between text-3xl font-bold">
                <span>Total</span>
                <span className="text-blue-400 font-black">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="w-full mt-8 bg-blue-400 hover:bg-blue-700 text-white py-5 rounded-2xl font-bold text-xl transition-all shadow-sm shadow-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}