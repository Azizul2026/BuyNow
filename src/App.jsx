import { useState } from "react";
import "./index.css"; // Your custom styles

function CartPage({ cart, onCheckout, onBack }) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        ← Back to Home
      </button>
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="border p-3 mb-2 bg-white rounded shadow-sm">
              {item.name} - ₹{item.price}
            </div>
          ))}
          <button
            onClick={onCheckout}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
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
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
      <h2 className="text-3xl font-bold mb-4">🎉 Order Placed Successfully!</h2>
      <button
        onClick={onBack}
        className="mt-4 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded font-medium"
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
    { id: 1, name: "Wireless Headphones", price: 1999, image: "https://via.placeholder.com/200x150?text=Headphones" },
    { id: 2, name: "Smart Watch", price: 2999, image: "https://via.placeholder.com/200x150?text=Smart+Watch" },
    { id: 3, name: "Gaming Mouse", price: 999, image: "https://via.placeholder.com/200x150?text=Mouse" },
    { id: 4, name: "Laptop Bag", price: 1499, image: "https://via.placeholder.com/200x150?text=Bag" },
  ];

  const addToCart = (product) => setCart([...cart, product]);
  const handleCheckout = () => {
    setCart([]);
    setPage("success");
  };

  if (page === "cart") return <CartPage cart={cart} onCheckout={handleCheckout} onBack={() => setPage("home")} />;
  if (page === "success") return <SuccessPage onBack={() => setPage("home")} />;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-yellow-400 p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">BuyNow 🛒</h1>
        <div className="cursor-pointer" onClick={() => setPage("cart")}>
          Cart ({cart.length})
        </div>
      </header>

      <section className="p-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Welcome to BuyNow</h2>
        <p className="text-gray-700 text-lg">
          Shop the best products at affordable prices.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {products.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded p-4 flex flex-col items-center">
            <img src={item.image} alt={item.name} className="mb-3 w-full h-40 object-cover rounded" />
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-600">₹{item.price}</p>
            <button
              onClick={() => addToCart(item)}
              className="mt-3 bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded font-medium"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
