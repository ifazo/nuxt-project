import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const { userEmail } = body;
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (!user) {
      setResponseStatus(event, 404);
      return { error: "User not found" };
    }
    if (user.role !== "SELLER") {
      setResponseStatus(event, 403);
      return { error: "Only seller can create shop" };
    }
    const shop = await prisma.shop.create({
      data: body,
    });
    return shop;
  } catch (error) {
    console.error("Error creating shop:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
