import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string };
    const body = await readBody(event);
    if (!id || !body) {
      setResponseStatus(event, 400);
      return { error: "Bad Request" };
    }
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
    if (!user || user.role !== "ADMIN") {
      setResponseStatus(event, 404);
      return { error: "User not found or not authorized" };
    }
    const updatedCategory = await prisma.category.update({
      where: {
        id: id,
      },
      data: body,
    });
    return updatedCategory;
  } catch (error) {
    console.error("Error deleting category:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
