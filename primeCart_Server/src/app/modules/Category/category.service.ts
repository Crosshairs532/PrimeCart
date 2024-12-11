import prisma from "../../prisma";

const createCategory = async (payload: any) => {
  const category = await prisma.category.createMany({
    data: payload,
  });

  return category;
};
export const categoryService = {
  createCategory,
};
