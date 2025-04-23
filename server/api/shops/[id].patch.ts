import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string };
    if (!id) {
      setResponseStatus(event, 400);
      return { error: "Bad Request" };
    }
    const body = await readBody(event);
    const shop = await prisma.shop.findUnique({
      where: {
        id: id,
      },
    });
    if (!shop) {
      setResponseStatus(event, 404);
      return { error: "Shop not found" };
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
