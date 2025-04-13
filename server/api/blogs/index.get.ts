import type { Blog } from "@prisma/client";
import prisma from "~/prisma";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { title, userId } = query as Blog;
    if (title) {
      const blogs = await prisma.blog.findMany({
        where: {
          title: {
            contains: title,
          },
        },
      });
      return blogs;
    } else if (userId) {
      const blogs = await prisma.blog.findMany({
        where: {
          userId: {
            contains: userId,
          },
        },
      });

      return blogs;
    }
    const blogs = await prisma.blog.findMany();
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    setResponseStatus(event, 500);
    return { error: "Internal Server Error" };
  }
});
