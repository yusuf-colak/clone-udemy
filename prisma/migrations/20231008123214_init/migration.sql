/*
  Warnings:

  - You are about to drop the column `onlyOwn` on the `permissions` table. All the data in the column will be lost.
  - You are about to drop the `_PermissionToRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PermissionToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_PermissionToRole` DROP FOREIGN KEY `_PermissionToRole_A_fkey`;

-- DropForeignKey
ALTER TABLE `_PermissionToRole` DROP FOREIGN KEY `_PermissionToRole_B_fkey`;

-- DropForeignKey
ALTER TABLE `_PermissionToUser` DROP FOREIGN KEY `_PermissionToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_PermissionToUser` DROP FOREIGN KEY `_PermissionToUser_B_fkey`;

-- AlterTable
ALTER TABLE `permissions` DROP COLUMN `onlyOwn`;

-- AlterTable
ALTER TABLE `permissions_on_roles` ADD COLUMN `onlyOwn` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `_PermissionToRole`;

-- DropTable
DROP TABLE `_PermissionToUser`;

-- CreateTable
CREATE TABLE `permissions_on_users` (
    `userId` VARCHAR(191) NOT NULL,
    `permissionId` VARCHAR(191) NOT NULL,
    `onlyOwn` BOOLEAN NOT NULL DEFAULT false,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`userId`, `permissionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `permissions_on_users` ADD CONSTRAINT `permissions_on_users_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permissions_on_users` ADD CONSTRAINT `permissions_on_users_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `permissions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
