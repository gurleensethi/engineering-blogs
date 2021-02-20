-- CreateTable
CREATE TABLE "UserPublication" (
    "publicationId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("userId","publicationId")
);

-- AddForeignKey
ALTER TABLE "UserPublication" ADD FOREIGN KEY ("publicationId") REFERENCES "Publication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPublication" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
