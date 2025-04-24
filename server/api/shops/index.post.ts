import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const userEmail = event.req.headers["user-email"] as string;
    if (!userEmail) {
      setResponseStatus(event, 400);
      return {
        error: "userEmail is required in header as 'user-email'",
      };
    }
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (!user || user.role !== "SELLER") {
      setResponseStatus(event, 404);
      return { error: "User not found or not a seller" };
    }
    const shop = await prisma.shop.create({
      data: {
        ...body,
        userEmail,
      },
    });
    return shop;
  } catch (error) {
    console.error("Error creating shop:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
