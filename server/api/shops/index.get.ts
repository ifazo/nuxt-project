import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { random, userEmail } = query as {
      random?: number;
      userEmail?: string;
    };

    let shops;

    if (random) {
      const allShops = await prisma.shop.findMany({
        include: {
          _count: {
            select: { products: true },
          },
        },
      });
      shops = allShops.sort(() => Math.random() - 0.5).slice(0, random);
    } else if (userEmail) {
      shops = await prisma.shop.findFirst({
        where: { user: { email: userEmail } },
        include: {
          _count: {
            select: { products: true },
          },
        },
      });
    } else {
      shops = await prisma.shop.findMany({
        include: {
          _count: {
            select: { products: true },
          },
        },
      });
    }
    return shops;
  } catch (error) {
    console.error("Error fetching shops:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
