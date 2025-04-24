import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const userEmail = event.req.headers["user-email"] as string;
    if (!userEmail) {
      setResponseStatus(event, 400);
      return {
        error:
          "userEmail is required in header as 'user-email'",
      };
    }
    const blog = await prisma.blog.create({
      data: {
        ...body,
        userEmail,
      },
    });
    return blog;
  } catch (error) {
    console.error("Error creating blog:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
