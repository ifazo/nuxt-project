import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const review = await prisma.review.create({
      data: body,
    });
    return review;
  } catch (error) {
    console.error("Error creating review:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
