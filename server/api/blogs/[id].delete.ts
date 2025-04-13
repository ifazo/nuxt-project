import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as { id: string };
  if (!id) {
    setResponseStatus(event, 400);
    return { error: "Bad Request" };
  }
  try {
    const blog = await prisma.blog.delete({
      where: {
        id: id,
      },
    });
    return blog;
  } catch (error) {
    console.error("Error deleting blog:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
