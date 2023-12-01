-- DropIndex
DROP INDEX `tracking_chapterId_fkey` ON `tracking`;

-- DropIndex
DROP INDEX `tracking_courseId_fkey` ON `tracking`;

-- DropIndex
DROP INDEX `tracking_userId_fkey` ON `tracking`;

-- AlterTable
ALTER TABLE `tracking` ADD COLUMN `isTime` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `tracking` ADD CONSTRAINT `tracking_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tracking` ADD CONSTRAINT `tracking_chapterId_fkey` FOREIGN KEY (`chapterId`) REFERENCES `chapter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tracking` ADD CONSTRAINT `tracking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
