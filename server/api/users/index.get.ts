import type { User } from "@prisma/client";
import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
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
