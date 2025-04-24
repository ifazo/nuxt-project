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
    const shop = await prisma.shop.findUnique({
      where: {
        userEmail,
      },
    });
    if (!shop || shop.userEmail !== userEmail) {
      setResponseStatus(event, 404);
      return { error: "You are not the shop owner" };
    }
    const deletedShop = await prisma.shop.delete({
      where: {
        id,
      },
    });
    return deletedShop;
  } catch (error) {
    console.error("Error deleting shop:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
