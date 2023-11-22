/*
  Warnings:

  - Added the required column `tenantId` to the `course` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `tracking_chapterId_idx` ON `tracking`;

-- DropIndex
DROP INDEX `tracking_courseId_idx` ON `tracking`;

-- DropIndex
DROP INDEX `tracking_userId_chapterId_key` ON `tracking`;

-- DropIndex
DROP INDEX `tracking_userId_idx` ON `tracking`;

-- AlterTable
ALTER TABLE `course` ADD COLUMN `tenantId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `course` ADD CONSTRAINT `course_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenants`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tracking` ADD CONSTRAINT `tracking_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tracking` ADD CONSTRAINT `tracking_chapterId_fkey` FOREIGN KEY (`chapterId`) REFERENCES `chapter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tracking` ADD CONSTRAINT `tracking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
