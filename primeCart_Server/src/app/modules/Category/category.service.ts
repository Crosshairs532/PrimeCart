import prisma from "../../prisma";

const createCategory = async (payload: any) => {
  const category = await prisma.category.create({
    data: payload,
  });

  return category;
};
const editCategory = async (id: string, payload: any) => {
  const category = await prisma.category.update({
    where: {
      id: id,
    },
    data: payload,
  });

  return category;
};
const deleteCategory = async (id: string) => {
  const category = await prisma.category.delete({
    where: {
      id: id,
    },
  });

  return category;
};
export const categoryService = {
  createCategory,
  editCategory,
  deleteCategory,
};
