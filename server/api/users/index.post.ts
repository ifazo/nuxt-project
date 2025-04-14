import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      setResponseStatus(event, 409);
      return { error: "User already exists" };
    }

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
