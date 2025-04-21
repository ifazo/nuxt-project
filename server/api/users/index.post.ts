import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (!body.email) {
      setResponseStatus(event, 400);
      return { error: "Email is required" };
    }

    let user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: body,
      });
    }
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
