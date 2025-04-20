import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const reviews = await prisma.review.findMany({
    where: {
      productId: query.productId as string,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
  return reviews;
});
