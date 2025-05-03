import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const userEmail = event.req.headers["user-email"] as string;
    if (!userEmail) {
      setResponseStatus(event, 400);
      return { error: "User email is required in header as 'user-email'" };
    }
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (!user) {
      setResponseStatus(event, 404);
      return { error: "User not found!" };
    }
    const orders = await prisma.order.findMany({
      where: {
        userEmail: user.email,
      },
    });

    const ordersWithProductDetails = await Promise.all(
      orders.map(async (order) => {
        const productsWithDetails = await Promise.all(
          (order.products as { productId: string; quantity: number }[]).map(
            async (product) => {
              const productDetails = await prisma.product.findUnique({
                where: { id: product.productId },
              });
              return {
                ...productDetails,
                quantity: product.quantity,
              };
            },
          ),
        );

        return {
          ...order,
          products: productsWithDetails,
        };
      }),
    );
    return ordersWithProductDetails;
  } catch (error) {
    console.error("Error creating wishlist:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
