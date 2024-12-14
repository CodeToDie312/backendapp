/*
  Warnings:

  - You are about to drop the column `date_created` on the `Version` table. All the data in the column will be lost.
  - You are about to drop the column `signer` on the `Version` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Version` DROP FOREIGN KEY `Version_proposal_code_fkey`;

-- DropIndex
DROP INDEX `Version_proposal_code_key` ON `Version`;

-- AlterTable
ALTER TABLE `Version` DROP COLUMN `date_created`,
    DROP COLUMN `signer`,
    ADD COLUMN `date_version_created` VARCHAR(191) NULL,
    ADD COLUMN `signer_version` VARCHAR(191) NULL,
    MODIFY `proposal_code` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Version` ADD CONSTRAINT `Version_proposal_code_fkey` FOREIGN KEY (`proposal_code`) REFERENCES `Proposal`(`proposal_code`) ON DELETE SET NULL ON UPDATE CASCADE;
