/*
  Warnings:

  - A unique constraint covering the columns `[senderId,receiverId]` on the table `follow_request` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `follow_request_senderId_receiverId_key` ON `follow_request`(`senderId`, `receiverId`);
