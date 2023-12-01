/*
  Warnings:

  - You are about to alter the column `isTime` on the `tracking` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `tracking` MODIFY `isTime` DOUBLE NULL DEFAULT 0;
