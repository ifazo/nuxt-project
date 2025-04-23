import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string };
    if (!id) {
      setResponseStatus(event, 400);
      return { error: "Bad Request" };
    }
    const shop = await prisma.shop.delete({
      where: {
        id,
      },
    });
    return shop;
  } catch (error) {
    console.error("Error deleting shop:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
