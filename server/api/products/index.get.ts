import type { Product } from "@prisma/client";
import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { title, categoryName, shopName } = query as Product;
    if (title) {
      const products = await prisma.product.findMany({
        where: {
          title: {
            contains: title,
          },
        },
      });
      return products;
    } else if (categoryName) {
      const products = await prisma.product.findMany({
        where: {
          categoryName: {
            contains: categoryName,
          },
        },
      });
      return products;
    } else if (shopName) {
      const products = await prisma.product.findMany({
        where: {
          shopName: {
            contains: shopName,
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
