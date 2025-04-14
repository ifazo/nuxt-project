import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const newReview = await prisma.blogReview.create({
      data: body,
    });
    return newReview;
  } catch (error) {
    console.error("Error creating review:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
