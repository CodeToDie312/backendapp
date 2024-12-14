/*
  Warnings:

  - You are about to drop the column `link_file_not_sign` on the `Version` table. All the data in the column will be lost.
  - You are about to drop the column `link_file_report_proposal` on the `Version` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Version` DROP COLUMN `link_file_not_sign`,
    DROP COLUMN `link_file_report_proposal`;
