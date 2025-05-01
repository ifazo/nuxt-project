-- CreateTable
CREATE TABLE "blog_reviews" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "blog" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "blog_reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "blog_reviews" ADD CONSTRAINT "blog_reviews_user_fkey" FOREIGN KEY ("user") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_reviews" ADD CONSTRAINT "blog_reviews_blog_fkey" FOREIGN KEY ("blog") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
