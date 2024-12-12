import prisma from "../../prisma";

const manageProductInventory = async (id: string, payload: any) => {
  const result = await prisma.product.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};
export const productService = {
  manageProductInventory,
};
