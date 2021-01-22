-- CreateTable
CREATE TABLE "Publication" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "blogName" TEXT NOT NULL,
    "desecription" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "guid" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desceription" TEXT,
    "pubDate" TIMESTAMP(3) NOT NULL,
    "link" TEXT NOT NULL,
    "publicationId" TEXT NOT NULL,

    PRIMARY KEY ("guid")
);

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("publicationId") REFERENCES "Publication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
