import API from "./axios";

export const addToCart = (productId, quantity = 1) => {
  return API.post("/cart/add", {
    product_id: productId,
    quantity,
  });
};

export const getCart = () => {
  return API.get("/cart/");
};

export const updateCartQuantity = (itemId, quantity) => {
  return API.put(`/cart/${itemId}?quantity=${quantity}`);
};

export const removeCartItem = (itemId) => {
  return API.delete(`/cart/${itemId}`);
};