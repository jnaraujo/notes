-- DropForeignKey
ALTER TABLE `Note` DROP FOREIGN KEY `Note_authorId_fkey`;

-- RenameIndex
ALTER TABLE `Note` RENAME INDEX `Note_authorId_fkey` TO `Note_authorId_idx`;
