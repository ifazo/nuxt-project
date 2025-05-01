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
    const review = await prisma.blogReview.findUnique({
      where: {
        id,
      },
    });
    if (!review) {
      setResponseStatus(event, 404);
      return { error: "Review not found" };
    }
    if (review?.userEmail !== userEmail) {
      setResponseStatus(event, 403);
      return { error: "You are not allowed to update this review" };
    }
    const updatedReview = await prisma.blogReview.update({
      where: {
        id,
      },
      data: body,
    });
    return updatedReview;
  } catch (error) {
    console.error("Error updating review:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
