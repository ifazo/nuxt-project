import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) {
    setResponseStatus(event, 400);
    return { error: "Bad Request" };
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      setResponseStatus(event, 404);
      return { error: "User not found" };
    }
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
