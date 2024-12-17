import { productService } from "@/services/Products/product.service";
import { useQuery } from "@tanstack/react-query";

export const useAllProducts = (id: String | undefined) => {
  return useQuery({
    queryKey: ["ALL_PRODUCTS"],
    queryFn: () => productService.AllProducts(id as string),
  });
};
