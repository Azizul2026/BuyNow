import { useState } from "react";
import "./index.css"; // Your custom styles

function CartPage({ cart, onCheckout, onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200"
      >
        ← Back to Home
      </button>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="border p-4 bg-white rounded shadow-lg flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={onCheckout}
            className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium transition duration-200"
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
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex flex-col justify-center items-center p-6">
      <h2 className="text-4xl font-bold mb-6 text-green-800">
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
    {
      id: 1,
      name: "Wireless Headphones",
      price: 1999,
      image:
        "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 2999,
      image:
        "https://images.unsplash.com/photo-1587825140708-26374d6b7e87?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 3,
      name: "Gaming Mouse",
      price: 999,
      image:
        "https://images.unsplash.com/photo-1589561084283-930aa7b1ee61?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 4,
      name: "Laptop Bag",
      price: 1499,
      image:
        "https://images.unsplash.com/photo-1598032891581-2c212f39fdd3?auto=format&fit=crop&w=200&q=80",
    },
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <header className="bg-yellow-400 p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800">BuyNow 🛒</h1>
        <div
          className="cursor-pointer font-medium text-gray-800 hover:text-gray-900 transition duration-200"
          onClick={() => setPage("cart")}
        >
          Cart ({cart.length})
        </div>
      </header>

      <section className="p-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Welcome to BuyNow</h2>
        <p className="text-gray-700 text-lg">
          Shop the best products at affordable prices.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center hover:shadow-xl transition duration-200"
          >
            <img
              src={item.image}
              alt={item.name}
              className="mb-3 w-full h-40 object-cover rounded-lg"
            />
            <h3 className="font-semibold text-gray-800">{item.name}</h3>
            <p className="text-gray-600">₹{item.price}</p>
            <button
              onClick={() => addToCart(item)}
              className="mt-3 bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded font-medium transition duration-200"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
