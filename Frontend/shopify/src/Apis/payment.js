import API from "./axios";

export const makePayment = () => {
  return API.post("/payment/");
};