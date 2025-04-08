import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as { id: string };
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
