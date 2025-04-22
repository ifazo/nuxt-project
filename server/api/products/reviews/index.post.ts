import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const review = await prisma.productReview.create({
      data: body,
    });
    return review;
  } catch (error) {
    console.error("Error creating review:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
