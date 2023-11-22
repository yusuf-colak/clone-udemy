/*
  Warnings:

  - You are about to drop the column `tenantId` on the `course` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `course` DROP FOREIGN KEY `course_tenantId_fkey`;

-- DropForeignKey
ALTER TABLE `tracking` DROP FOREIGN KEY `tracking_chapterId_fkey`;

-- DropForeignKey
ALTER TABLE `tracking` DROP FOREIGN KEY `tracking_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `tracking` DROP FOREIGN KEY `tracking_userId_fkey`;

-- AlterTable
ALTER TABLE `course` DROP COLUMN `tenantId`;
