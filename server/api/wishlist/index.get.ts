import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { productId } = query as { productId: string };
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
    let wishlist;
    if (productId) {
      wishlist = await prisma.wishlist.findFirst({
        where: {
          productId: productId,
          userEmail: user.email,
        },
        include: {
          product: true,
        },
      });
    } else {
      wishlist = await prisma.wishlist.findMany({
        where: {
          userEmail: user.email,
        },
        include: {
          product: true,
        },
      });
    }
    return wishlist;
  } catch (error) {
    console.error("Error creating wishlist:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
