import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string };
    if (!id) {
      setResponseStatus(event, 400);
      return { error: "Bad Request" };
    }
    const userEmail = event.req.headers["user-email"] as string;
    if (!userEmail) {
      setResponseStatus(event, 400);
      return { error: "User email is required in header as 'user-email'" };
    }
    const wishlist = await prisma.wishlist.findUnique({
      where: {
        id,
      },
    });
    if (!wishlist) {
      setResponseStatus(event, 404);
      return { error: "Wishlist not found" };
    }
    if (wishlist?.userEmail !== userEmail) {
      setResponseStatus(event, 403);
      return { error: "You are not allowed to delete this wishlist" };
    }
    const deletedWishlist = await prisma.wishlist.delete({
      where: {
        id,
      },
    });
    return deletedWishlist;
  } catch (error) {
    console.error("Error deleting wishlist:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
