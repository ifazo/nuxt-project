import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const product = await prisma.product.create({
      data: body,
    });
    return product;
  } catch (error) {
    console.error("Error creating product:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
