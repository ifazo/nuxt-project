import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const user = await prisma.user.create({
      data: body,
    });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
