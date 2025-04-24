import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string };
    if (!id) {
      setResponseStatus(event, 400);
      return { error: "Bad Request" };
    }
    const userEmail = event.req.headers["user-email"] as string;
    if (!userEmail) {
      setResponseStatus(event, 400);
      return { error: "User email is required in header as 'user-email'" };
    }
    const blog = await prisma.blog.findUnique({
      where: {
        id: id,
      },
    });
    if (!blog || blog.userEmail !== userEmail) {
      setResponseStatus(event, 404);
      return { error: "You are not the blog owner" };
    }
    const deletedBlog = await prisma.blog.delete({
      where: {
        id: id,
      },
    });
    return deletedBlog;
  } catch (error) {
    console.error("Error deleting blog:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
