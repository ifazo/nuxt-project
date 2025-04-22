import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const userEmail = event.req.headers["user-email"] as string;
    if (!userEmail) {
      setResponseStatus(event, 400);
      return { error: "User email is required in header as 'user-email'" };
    }
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (!user) {
      setResponseStatus(event, 404);
      return { error: "User not found" };
    }
    if (user.role !== "ADMIN") {
      setResponseStatus(event, 403);
      return { error: "Only admin can create category" };
    }
    const category = await prisma.category.create({
      data: body,
    });
    return category;
  } catch (error) {
    console.error("Error creating category:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
