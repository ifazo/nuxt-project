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
    });
    if (!blog) {
      setResponseStatus(event, 404);
      return { error: "Blog not found" };
    }
    return blog;
  } catch (error) {
    console.error("Error fetching blog:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
