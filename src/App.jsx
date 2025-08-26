import { useState } from "react";
import "./index.css"; // Your custom styles

function CartPage({ cart, onCheckout, onBack }) {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <button
        onClick={onBack}
        className="mb-6 px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200 self-start"
      >
        ← Back to Home
      </button>
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg text-center">Your cart is empty</p>
      ) : (
        <div className="w-full max-w-4xl space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="border p-4 bg-white rounded-lg shadow flex items-center gap-6 hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600 text-md mt-1">₹{item.price}</p>
              </div>
              <div>
                <p className="text-gray-800 font-medium text-lg">Qty: 1</p>
              </div>
            </div>
          ))}
          <button
            onClick={onCheckout}
            className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded font-semibold text-lg transition duration-200"
          >
            ✅ Checkout
          </button>
        </div>
      )}
    </div>
  );
}

function SuccessPage({ onBack }) {
  return (
    <div className="min-h-screen bg-green-100 flex flex-col justify-center items-center p-6">
      <h2 className="text-4xl font-bold mb-6 text-green-800 text-center">
        🎉 Order Placed Successfully!
      </h2>
      <button
        onClick={onBack}
        className="mt-4 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 rounded font-medium transition duration-200"
      >
        ← Back to Home
      </button>
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("home"); // "home" | "cart" | "success"

  const products = [
    { id: 1, name: "Wireless Headphones", price: 1999, image: "https://picsum.photos/id/180/300/200" },
    { id: 2, name: "Smart Watch", price: 2999, image: "https://picsum.photos/id/21/300/200" },
    { id: 3, name: "Gaming Mouse", price: 999, image: "https://picsum.photos/id/30/300/200" },
    { id: 4, name: "Laptop Bag", price: 1499, image: "https://picsum.photos/id/1060/300/200" },
  ];

  const addToCart = (product) => setCart([...cart, product]);
  const handleCheckout = () => {
    setCart([]);
    setPage("success");
  };

  if (page === "cart")
    return <CartPage cart={cart} onCheckout={handleCheckout} onBack={() => setPage("home")} />;
  if (page === "success") return <SuccessPage onBack={() => setPage("home")} />;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-yellow-400 p-4 flex justify-center shadow-md">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-gray-800">BuyNow 🛒</h1>
          <div
            className="cursor-pointer font-medium text-gray-800 hover:text-gray-900 transition duration-200"
            onClick={() => setPage("cart")}
          >
            Cart ({cart.length})
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="p-10 text-center bg-gradient-to-r from-yellow-100 to-yellow-200">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Welcome to BuyNow</h2>
        <p className="text-gray-700 text-lg md:text-xl">Shop the best products at affordable prices.</p>
      </section>

      {/* Products */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center hover:shadow-xl transition duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="mb-3 w-full h-48 object-cover rounded-lg"
            />
            <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
            <p className="text-gray-600 text-md mt-1">₹{item.price}</p>
            <button
              onClick={() => addToCart(item)}
              className="mt-3 w-full bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded font-medium transition duration-200"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
