import type { Product } from "@prisma/client";
import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { title, categoryName, shopName, random } =
      query as Partial<Product> & { random?: number };
    let products;
    if (random) {
      const allProducts = await prisma.product.findMany();
      products = allProducts.sort(() => Math.random() - 0.5).slice(0, random);
    } else if (title) {
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
