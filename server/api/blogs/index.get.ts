import type { Blog } from "@prisma/client";
import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { title, userEmail } = query as Partial<Blog>;

    let blogs;

    if (title) {
      blogs = await prisma.blog.findMany({
        where: {
          title: {
            contains: title,
          },
        },
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });
    } else if (userEmail) {
      blogs = await prisma.blog.findMany({
        where: {
          userEmail: {
            contains: userEmail,
          },
        },
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });
    } else {
      blogs = await prisma.blog.findMany({
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });
    }
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
