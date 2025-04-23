import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { random } = query as { random?: number };

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
    } else {
      shops = await prisma.shop.findMany({
        include: {
          _count: {
            select: { products: true },
          },
        },
      });
    }
    return shops.map((shop) => ({
      ...shop,
      productCount: shop._count.products,
    }));
  } catch (error) {
    console.error("Error fetching shops:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
