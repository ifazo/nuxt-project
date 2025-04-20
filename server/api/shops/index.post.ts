import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
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
