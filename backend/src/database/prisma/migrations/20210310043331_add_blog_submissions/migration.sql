-- CreateTable
CREATE TABLE "BlogSubmission" (
    "id" SERIAL NOT NULL,
    "blogName" TEXT NOT NULL,
    "blogUrl" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    PRIMARY KEY ("id")
);
-- AddForeignKey
ALTER TABLE "BlogSubmission"
ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;