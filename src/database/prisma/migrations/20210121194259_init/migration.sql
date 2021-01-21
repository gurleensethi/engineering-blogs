-- CreateTable
CREATE TABLE "Post" (
    "uniqueName" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desceription" TEXT,
    "pubDate" TIMESTAMP(3) NOT NULL,
    "link" TEXT NOT NULL,
    "guid" TEXT NOT NULL,
    "pubName" TEXT NOT NULL,
    "pubLink" TEXT NOT NULL,

    PRIMARY KEY ("uniqueName")
);
