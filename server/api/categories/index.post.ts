import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const category = await prisma.category.create({
      data: body,
    });
    return category;
  } catch (error) {
    console.error("Error creating category:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
