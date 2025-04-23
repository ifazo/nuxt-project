import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string };
    if (!id) {
      setResponseStatus(event, 400);
      return { error: "Bad Request" };
    }
    const body = await readBody(event);
    const userEmail = event.req.headers["user-email"] as string;
    if (!userEmail) {
      setResponseStatus(event, 400);
      return { error: "User email is required in header as 'user-email'" };
    }
    const shop = await prisma.shop.findUnique({
      where: {
        userEmail,
      },
    });
    if (!shop) {
      setResponseStatus(event, 404);
      return { error: "You are not the shop owner" };
    }
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      setResponseStatus(event, 404);
      return { error: "Product not found" };
    }
    if (product?.shopName !== shop.name) {
      setResponseStatus(event, 403);
      return { error: "You are not allowed to update this product" };
    }
    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: body,
    });
    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
