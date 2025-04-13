import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as { id: string };
  const body = await readBody(event);
  try {
    const blog = await prisma.blog.update({
      where: {
        id: id,
      },
      data: body,
    });
    return blog;
  } catch (error) {
    console.error("Error updating blog:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
