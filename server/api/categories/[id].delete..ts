import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string };
    if (!id) {
      setResponseStatus(event, 400);
      return { error: "Bad Request" };
    }
    const category = await prisma.category.delete({
      where: {
        id,
      },
    });
    return category;
  } catch (error) {
    console.error("Error deleting category:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
