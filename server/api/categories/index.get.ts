import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
