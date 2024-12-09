/*
  Warnings:

  - You are about to drop the column `user_type` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `user_type`,
    ADD COLUMN `role` ENUM('USER', 'ARTIST') NOT NULL DEFAULT 'USER';
