import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { productId } = query as { productId: string };
    if (!productId) {
      setResponseStatus(event, 400);
      return { error: "Product ID query is required" };
    }
    const reviews = await prisma.productReview.findMany({
      where: {
        productId: productId,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
