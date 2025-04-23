import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string };
    if (!id) {
      setResponseStatus(event, 400);
      return { error: "Shop ID is required" };
    }
    const shop = await prisma.shop.findUnique({
      where: {
        id: id,
      },
      include: {
        products: true,
      },
    });
    if (!shop) {
      setResponseStatus(event, 404);
      return { error: "Shop not found" };
    }
    return shop;
  } catch (error) {
    console.error("Error fetching shop:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
