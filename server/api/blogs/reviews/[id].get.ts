import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string };
    if (!id) {
      setResponseStatus(event, 400);
      return { error: "Bad Request" };
    }
    const review = await prisma.blogReview.findUnique({
      where: {
        id,
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
    return review;
  } catch (error) {
    console.error("Error fetching review:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
