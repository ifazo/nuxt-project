import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { random } = query as { random?: number };

    let categories;

    if (random) {
      const allCategories = await prisma.category.findMany({
        include: {
          _count: {
            select: { products: true },
          },
        },
      });
      categories = allCategories
        .sort(() => Math.random() - 0.5)
        .slice(0, random);
    } else {
      categories = await prisma.category.findMany({
        include: {
          _count: {
            select: { products: true },
          },
        },
      });
    }

    return categories.map((category) => ({
      ...category,
      productCount: category._count.products,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
