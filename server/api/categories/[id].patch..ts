import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string };
    if (!id) {
      setResponseStatus(event, 400);
      return { error: "Bad Request" };
    }
    const body = await readBody(event);
    const category = await prisma.category.findUnique({
      where: {
        id: id,
      },
    });
    if (!category) {
      setResponseStatus(event, 404);
      return { error: "Category not found" };
    }
    const updatedCategory = await prisma.category.update({
      where: {
        id: id,
      },
      data: body,
    });
    return updatedCategory;
  } catch (error) {
    console.error("Error deleting category:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
