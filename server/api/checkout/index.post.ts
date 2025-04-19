import Stripe from "stripe";
import prisma from "~/prisma";
import type { CartItem } from "~/stores/cart";

const config = useRuntimeConfig();
const stripe = new Stripe(config.stripeSecretKey);

export default defineEventHandler(async (event) => {
  try {
    const { products, name, email } = await readBody(event);

    if (!products || !Array.isArray(products) || products.length === 0) {
      throw new Error("Invalid or missing products array");
    }
    if (!name || !email) {
      throw new Error("Missing customer name or email");
    }

    const customer = await stripe.customers.create({
      email,
      name,
    });

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: products.map((product: CartItem) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
            images: product.images,
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: product.quantity || 1,
      })),
      mode: "payment",
      customer: customer.id,
      success_url: `${getRequestURL(event).origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getRequestURL(event).origin}/cancel`,
    });

    const order = {
      products,
      userEmail: email,
      total: products.reduce(
        (acc: number, product: { price: number; quantity: number }) =>
          acc + product.price * (product.quantity || 1),
        0,
      ),
    };

    await prisma.order.create({
      data: order,
    });

    return { id: stripeSession.id };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
