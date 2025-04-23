import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const userEmail = event.req.headers["user-email"] as string;
    if (!userEmail) {
      setResponseStatus(event, 400);
      return { error: "User email is required in header as 'user-email'" };
    }
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (!user || user.role !== "SELLER") {
      setResponseStatus(event, 404);
      return { error: "User not found or not a seller" };
    }
    const shop = await prisma.shop.findUnique({
      where: {
        userEmail: user.email,
      },
    });
    if (!shop || shop.userEmail !== userEmail) {
      setResponseStatus(event, 404);
      return { error: "Shop not found or you are not the owner" };
    }
    const product = await prisma.product.create({
      data: {
        ...body,
        shopName: shop.name,
      },
    });
    return product;
  } catch (error) {
    console.error("Error creating product:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
