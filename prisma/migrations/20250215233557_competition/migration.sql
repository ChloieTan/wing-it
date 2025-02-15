-- CreateTable
CREATE TABLE `Competition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `skills` VARCHAR(191) NOT NULL,
    `creator` INTEGER NOT NULL,
    `capacity` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Competition` ADD CONSTRAINT `Competition_creator_fkey` FOREIGN KEY (`creator`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
