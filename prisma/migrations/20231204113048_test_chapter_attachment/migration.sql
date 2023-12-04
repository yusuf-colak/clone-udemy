-- AlterTable
ALTER TABLE `attachments` ADD COLUMN `chapterId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `attachments` ADD CONSTRAINT `attachments_chapterId_fkey` FOREIGN KEY (`chapterId`) REFERENCES `chapter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
