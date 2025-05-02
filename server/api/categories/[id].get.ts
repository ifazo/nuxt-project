import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string };
    if (!id) {
      setResponseStatus(event, 400);
      return { error: "Shop ID is required" };
    }
    const category = await prisma.category.findUnique({
      where: {
        id: id,
      },
      include: {
        products: true,
      },
    });
    if (!category) {
      setResponseStatus(event, 404);
      return { error: "Category not found" };
    }
    return category;
  } catch (error) {
    console.error("Error fetching category:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
