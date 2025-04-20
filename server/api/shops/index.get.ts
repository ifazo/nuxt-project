import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const shops = await prisma.shop.findMany();
    return shops;
  } catch (error) {
    console.error("Error fetching shops:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
