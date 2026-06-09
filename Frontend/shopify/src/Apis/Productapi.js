import API from "./axios";

export const getProducts = (search = "", category = "",page =1) => {
  return API.get("/products/", {
    params: {
      search,
      category,
      page,
      limit:8
    },
  });
};
