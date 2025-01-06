-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullname` VARCHAR(191) NOT NULL,
    `student_code` VARCHAR(191) NOT NULL,
    `position_name` VARCHAR(191) NULL,
    `topic_code` VARCHAR(191) NULL,

    UNIQUE INDEX `Student_student_code_key`(`student_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullname` VARCHAR(191) NOT NULL,
    `employ_code` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NULL,
    `birthday` VARCHAR(191) NULL,
    `id_card_number` VARCHAR(191) NULL,
    `social_code` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `education` VARCHAR(191) NULL,
    `level` VARCHAR(191) NULL,
    `foreign_lang` VARCHAR(191) NULL,
    `it_level` VARCHAR(191) NULL,
    `join_clan` VARCHAR(191) NULL,
    `nation` VARCHAR(191) NULL,
    `sex` VARCHAR(191) NULL,
    `date_join` VARCHAR(191) NULL,
    `payday` VARCHAR(191) NULL,
    `level_salary` VARCHAR(191) NULL,
    `multiplier` VARCHAR(191) NULL,
    `extend_salary` VARCHAR(191) NULL,
    `link_file_id_card` VARCHAR(191) NULL,
    `link_education` VARCHAR(191) NULL,
    `link_contract` VARCHAR(191) NULL,

    UNIQUE INDEX `Employee_employ_code_key`(`employ_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Topic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_topic` VARCHAR(191) NOT NULL,
    `topic_code` VARCHAR(191) NOT NULL,
    `version` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `unit` VARCHAR(191) NULL,
    `level_manager` VARCHAR(191) NULL,
    `burget` VARCHAR(191) NULL,
    `year` VARCHAR(191) NULL,
    `link_file_explanation` VARCHAR(191) NULL,
    `link_file_outline` VARCHAR(191) NULL,
    `link_file_report` VARCHAR(191) NULL,

    UNIQUE INDEX `Topic_topic_code_key`(`topic_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proposal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_proposal` VARCHAR(191) NOT NULL,
    `proposal_code` VARCHAR(191) NOT NULL,
    `date_created` VARCHAR(191) NULL,
    `signer` VARCHAR(191) NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `link_file_not_sign` VARCHAR(191) NULL,
    `link_file_report_proposal` VARCHAR(191) NULL,

    UNIQUE INDEX `Proposal_proposal_code_key`(`proposal_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Version` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_version` VARCHAR(191) NOT NULL,
    `proposal_code` VARCHAR(191) NULL,
    `date_version_created` VARCHAR(191) NULL,
    `signer_version` VARCHAR(191) NULL,
    `fwd` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OtpVerification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `otp` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiredAt` DATETIME(3) NOT NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `OtpVerification_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_topic_code_fkey` FOREIGN KEY (`topic_code`) REFERENCES `Topic`(`topic_code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Version` ADD CONSTRAINT `Version_proposal_code_fkey` FOREIGN KEY (`proposal_code`) REFERENCES `Proposal`(`proposal_code`) ON DELETE CASCADE ON UPDATE CASCADE;
