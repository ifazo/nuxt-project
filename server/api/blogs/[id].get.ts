import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) {
    setResponseStatus(event, 400);
    return { error: "Bad Request" };
  }
  try {
    const blog = await prisma.blog.findUnique({
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
    if (!blog) {
      setResponseStatus(event, 404);
      return { error: "Blog not found" };
    }

    const products = await prisma.product.findMany({
      where: {
        tags: {
          hasSome: blog.tags,
        },
      },
    });
    return {
      blog,
      products,
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
