/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `domains` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `domains_url_key` ON `domains`(`url`);
