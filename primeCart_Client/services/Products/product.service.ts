import { AxiosInstance } from "@/app/lib/Axios/axios";

const AllProducts = async (id: string) => {
  const result = await AxiosInstance.get(`/customer/browse-products?id=${id}`);
  return result.data.data;
};

const AllCategory = async () => {
  const result = await AxiosInstance.get("/customer/browse-products");
  return result.data.data;
};

export const productService = {
  AllProducts,
  AllCategory,
};
