/*
  Warnings:

  - You are about to drop the `RolesOnUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `RolesOnUsers` DROP FOREIGN KEY `RolesOnUsers_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `RolesOnUsers` DROP FOREIGN KEY `RolesOnUsers_userId_fkey`;

-- DropTable
DROP TABLE `RolesOnUsers`;

-- CreateTable
CREATE TABLE `roles_on_users` (
    `userId` VARCHAR(191) NOT NULL,
    `roleId` VARCHAR(191) NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`userId`, `roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `roles_on_users` ADD CONSTRAINT `roles_on_users_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `roles_on_users` ADD CONSTRAINT `roles_on_users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
