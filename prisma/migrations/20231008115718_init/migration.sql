/*
  Warnings:

  - You are about to drop the column `name` on the `domains` table. All the data in the column will be lost.
  - Added the required column `url` to the `domains` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `domains` DROP COLUMN `name`,
    ADD COLUMN `default` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `url` VARCHAR(191) NOT NULL;
