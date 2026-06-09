import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { makePayment } from "../Apis/payment";
import { CartContext } from "../context/Cartcontext";

export default function Payment() {
  const navigate = useNavigate();
  const { cartDispatch } = useContext(CartContext);

  const handlePayment = async () => {
    try {
      const res = await makePayment();

      alert(`${res.data.message}. Amount: ₹${res.data.amount}`);

      cartDispatch({ type: "CLEAR_CART" });

      navigate("/");
    } catch (error) {
      alert("Payment failed");
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Payment</h2>

        <p className="mb-4">
          This is a basic simulated payment flow.
        </p>

        <button
          onClick={handlePayment}
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}