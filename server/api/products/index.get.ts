import type { Product } from "@prisma/client";
import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { title, categoryName, shopName } = query as Partial<Product>;
    let products;
    if (title) {
      products = await prisma.product.findMany({
        where: {
          title: {
            contains: title,
          },
        },
      });
    } else if (categoryName) {
      products = await prisma.product.findMany({
        where: {
          categoryName: {
            contains: categoryName,
          },
        },
      });
    } else if (shopName) {
      products = await prisma.product.findMany({
        where: {
          shopName: {
            contains: shopName,
          },
        },
      });
    } else {
      products = await prisma.product.findMany();
    }
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
