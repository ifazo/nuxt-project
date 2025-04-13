import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as { id: string };
  if (!id) {
    setResponseStatus(event, 400);
    return { error: "Bad Request" };
  }
  try {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    console.error("Error deleting user:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
