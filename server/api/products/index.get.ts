import type { Product } from "@prisma/client";
import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { title, categorySlug } = query as Product;
    if (title) {
      const products = await prisma.product.findMany({
        where: {
          title: {
            contains: title,
          },
        },
      });
      return products;
    } else if (categorySlug) {
      const products = await prisma.product.findMany({
        where: {
          categorySlug: {
            contains: categorySlug,
          },
        },
      });
      return products;
    }
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
