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
    if (!user) {
      setResponseStatus(event, 404);
      return { error: "User not found!" };
    }
    const existingWishlist = await prisma.wishlist.findFirst({
      where: {
        productId: body.productId,
        userEmail: user.email,
      },
    });
    if (existingWishlist) {
      setResponseStatus(event, 400);
      return { error: "Product already in wishlist" };
    } else {
      const wishlist = await prisma.wishlist.create({
        data: {
          productId: body.productId,
          userEmail: user.email,
        },
      });
      return wishlist;
    }
  } catch (error) {
    console.error("Error creating wishlist:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
