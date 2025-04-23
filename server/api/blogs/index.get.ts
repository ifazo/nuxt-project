import type { Blog } from "@prisma/client";
import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { title, userEmail, random } = query as Partial<Blog> & {
      random?: number;
    };

    let blogs;

    if (random) {
      const allBlogs = await prisma.blog.findMany({
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });
      blogs = allBlogs.sort(() => Math.random() - 0.5).slice(0, random);
    } else if (title) {
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
