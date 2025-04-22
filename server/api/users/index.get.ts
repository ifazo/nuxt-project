import type { User } from "@prisma/client";
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
      return { error: "User not found" };
    }
    if (user.role !== "ADMIN") {
      setResponseStatus(event, 403);
      return { error: "Only admin can create category" };
    }
    const query = getQuery(event);
    const { role, email } = query as User;
    if (role) {
      const users = await prisma.user.findMany({
        where: {
          role: {
            equals: role,
          },
        },
      });
      return users;
    } else if (email) {
      const users = await prisma.user.findMany({
        where: {
          email: {
            contains: email,
          },
        },
      });
      return users;
    }
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
