import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const userEmail = event.req.headers["user-email"] as string;
    const productId = event.req.headers["product-id"] as string;
    if (!userEmail || !productId) {
      setResponseStatus(event, 400);
      return {
        error:
          "userEmail and productId is required in header as 'user-email' and 'product-id",
      };
    }
    const body = await readBody(event);
    const review = await prisma.productReview.create({
      data: {
        ...body,
        userEmail,
        productId,
      },
    });
    return review;
  } catch (error) {
    console.error("Error creating review:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
