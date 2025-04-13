import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const blog = await prisma.blog.create({
      data: body,
    });
    return blog;
  } catch (error) {
    console.error("Error creating blog:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
