import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const userEmail = event.req.headers["user-email"] as string;
    const blogId = event.req.headers["blog-id"] as string;
    if (!userEmail || !blogId) {
      setResponseStatus(event, 400);
      return {
        error:
          "userEmail and blogId is required in header as 'user-email' and 'blog-id'",
      };
    }
    const review = await prisma.blogReview.create({
      data: {
        ...body,
        userEmail,
        blogId,
      },
    });
    return review;
  } catch (error) {
    console.error("Error creating review:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
