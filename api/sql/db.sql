CREATE TABLE IF NOT EXISTS `Cook` (
  `id` TINYINT(3) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(64) NOT NULL,
  `description` TEXT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `parentId` TINYINT(3) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;