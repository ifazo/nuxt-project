import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as { id: string };
  const body = await readBody(event);
  if (!id) {
    setResponseStatus(event, 400);
    return { error: "Bad Request" };
  }
  try {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: body,
    });
    return product;
  } catch (error) {
    console.error("Error updating product:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
