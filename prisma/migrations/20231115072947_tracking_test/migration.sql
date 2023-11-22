-- CreateTable
CREATE TABLE `tracking` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,
    `chapterId` VARCHAR(191) NOT NULL,
    `isCompleted` BOOLEAN NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `tracking_userId_idx`(`userId`),
    INDEX `tracking_courseId_idx`(`courseId`),
    INDEX `tracking_chapterId_idx`(`chapterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
