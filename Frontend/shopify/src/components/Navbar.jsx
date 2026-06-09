import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaShopify } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { RiAccountPinCircleLine, RiLogoutCircleRLine } from "react-icons/ri";

import { AuthContext } from "../context/Authcontext";
import { CartContext } from "../context/Cartcontext";
import { getCart } from "../Apis/Cartapi";

function Navbar() {
  const navigate = useNavigate();

  const { authState, authDispatch } = useContext(AuthContext);
  const { cartState, cartDispatch } = useContext(CartContext);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const res = await getCart();

        cartDispatch({
          type: "SET_CART",
          payload: res.data,
        });
      } catch (error) {
        console.log("Cart load error:", error.response?.data || error.message);
      }
    };

    loadCart();

    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, [cartDispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");

    authDispatch({ type: "LOGOUT" });
    cartDispatch({ type: "CLEAR_CART" });

    navigate("/login");
  };

  return (
    <nav className="bg-black sticky top-0 z-50 text-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <NavLink to="/home" className="hover:text-blue-400">
          Home
        </NavLink>

        <NavLink to="/products" className="hover:text-blue-400">
          FeaturedCollection
        </NavLink>

        <NavLink to="/aboutus" className="hover:text-blue-400">
          AboutUs
        </NavLink>
      </div>

      <NavLink
        to="/"
        className="text-2xl font-bold flex items-center gap-2 px-5"
      >
        <FaShopify />
        <span>Shopify</span>
      </NavLink>

      <div className="flex items-center gap-4">
        <NavLink to="/cart" className="hover:text-blue-400 flex items-center">
          <IoCartOutline size={26} />
          ({cartState?.items?.length || 0})
        </NavLink>

        {authState.isAuthenticated ? (
          <button onClick={handleLogout} className="px-4 py-2 rounded-lg">
            <RiLogoutCircleRLine size={26} />
          </button>
        ) : (
          <>
            <NavLink to="/login" className="hover:text-blue-400">
              <RiAccountPinCircleLine size={26} />
            </NavLink>

            <NavLink to="/register" className="bg-gray-700 px-4 py-2 rounded-lg">
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;