/*
  Warnings:

  - Made the column `location` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `location` VARCHAR(191) NOT NULL;
