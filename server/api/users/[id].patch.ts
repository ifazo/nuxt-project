import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as { id: string };
  const body = await readBody(event);
  if (!id) {
    setResponseStatus(event, 400);
    return { error: "Bad Request" };
  }
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: body,
    });
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
