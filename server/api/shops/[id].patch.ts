import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string };
    const body = await readBody(event);
    if (!id || !body) {
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
    const updatedShop = await prisma.shop.update({
      where: {
        id: id,
      },
      data: body,
    });
    return updatedShop;
  } catch (error) {
    console.error("Error updating shop:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
