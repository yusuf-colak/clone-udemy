/*
  Warnings:

  - A unique constraint covering the columns `[userId,chapterId]` on the table `tracking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tracking_userId_chapterId_key` ON `tracking`(`userId`, `chapterId`);
