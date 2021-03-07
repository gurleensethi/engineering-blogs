/*
 Warnings:
 
 - Made the column `role` on table `User` required. The migration will fail if there are existing NULL values in that column.
 
 */
--SetExistingUsersRoles
UPDATE "User"
SET "role" = 'USER';
-- AlterTable
ALTER TABLE "User"
ALTER COLUMN "role"
SET NOT NULL;