import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as { id: string };
  if (!id) {
    setResponseStatus(event, 400);
    return { error: "Bad Request" };
  }
  try {
    const product = await prisma.product.delete({
      where: {
        id,
      },
    });
    return product;
  } catch (error) {
    console.error("Error deleting product:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
