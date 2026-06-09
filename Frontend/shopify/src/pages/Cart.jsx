import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";

import {
  getCart,
  updateCartQuantity,
  removeCartItem,
} from "../Apis/Cartapi";
import { CartContext } from "../context/Cartcontext";
export default function Cart() {
  const navigate = useNavigate();
  const { cartState, cartDispatch } = useContext(CartContext);

  const loadCart = async () => {
    try {
      const res = await getCart();
      cartDispatch({ type: "SET_CART", payload: res.data });
    } catch (error) {
      alert("Please login to view cart");
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleQuantityChange = async (itemId, quantity) => {
    if (quantity < 1) return;

    await updateCartQuantity(itemId, quantity);
    loadCart();
  };

  const handleRemove = async (itemId) => {
    await removeCartItem(itemId);
    loadCart();
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl text-amber-50 font-bold mb-5">Shopping Cart</h2>

      {cartState.items.length === 0 && <p>Your cart is empty.</p>}

      {cartState.items.map((item) => (
        <div
          key={item.id}
          className="bg-gray-800 text-amber-50 rounded p-4 mb-4 flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold text-lg">{item.name}</h3>
            <p>Price: ₹{item.price}</p>
            <p>Total: ₹{item.total}</p>
          </div>

          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) =>
              handleQuantityChange(item.id, Number(e.target.value))
            }
            className="border p-2 rounded w-20"
          />

          <button
            onClick={() => handleRemove(item.id)}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            <MdDeleteForever size={26}/>

          </button>
        </div>
      ))}

      <div className="mt-6 text-white p-4 rounded shadow">
        <h3 className="text-xl font-bold">
          Cart Total: ₹{cartState.cart_total}
        </h3>

        <button
          onClick={() => navigate("/payment")}
          disabled={cartState.items.length === 0}
          className="mt-4 bg-green-600 text-white px-6 py-3 rounded disabled:bg-gray-400"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}