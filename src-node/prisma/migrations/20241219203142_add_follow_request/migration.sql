/*
  Warnings:

  - A unique constraint covering the columns `[id,url]` on the table `images` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `follow_request` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `senderId` INTEGER NOT NULL,
    `receiverId` INTEGER NOT NULL,
    `status` ENUM('PENDING', 'ACCEPTED', 'REJECTED') NOT NULL DEFAULT 'PENDING',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `images_id_url_key` ON `images`(`id`, `url`);

-- AddForeignKey
ALTER TABLE `follow_request` ADD CONSTRAINT `follow_request_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `follow_request` ADD CONSTRAINT `follow_request_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
