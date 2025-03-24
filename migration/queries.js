const migrationQueries = [
  {
    version: 1,
    description: "Create users table",
    query:
      "CREATE TABLE IF NOT EXISTS users \
        (id INT AUTO_INCREMENT PRIMARY KEY, \
        first_name VARCHAR(100) NOT NULL, \
        last_name VARCHAR(100) NOT NULL, \
        username VARCHAR(50) UNIQUE KEY NOT NULL, \
        email VARCHAR(100) UNIQUE KEY NOT NULL, \
        password LONGTEXT NOT NULL)",
  },
  {
    version: 2,
    description: "Create roles table",
    query:
      "CREATE TABLE `user_types` (\
        `id` INT NOT NULL AUTO_INCREMENT,\
        `user_type_name` VARCHAR(45) NOT NULL,\
        PRIMARY KEY (`id`), UNIQUE INDEX `user_type_name_UNIQUE` (`user_type_name` ASC) VISIBLE);",
  },
  {
    version: 3,
    description: "Create Super Admin Role",
    query:
      "INSERT INTO `user_types` (`user_type_name`) VALUES ('Super Admin');",
  },
  {
    version: 4,
    description: "Alter User Table by adding user_type and created_by",
    query:
      "ALTER TABLE `users` \
    ADD COLUMN `user_type` INT NOT NULL AFTER `password`,\
    ADD COLUMN `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `user_type`,\
    ADD INDEX `user_type_idx` (`user_type` ASC) VISIBLE;",
  },
  {
    version: 5,
    description: "Add Constraint",
    query:
      "ALTER TABLE `users` ADD CONSTRAINT `user_type` FOREIGN KEY (`user_type`) REFERENCES `user_types` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;",
  },
];

const initialisationQueries = {
  create_db: "CREATE DATABASE IF NOT EXISTS ctmp_db",
  use_db: "USE ctmp_db",
  create_migration_table:
    "CREATE TABLE IF NOT EXISTS migrations (version INT PRIMARY KEY, description VARCHAR(255), applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
};

module.exports = { migrationQueries, initialisationQueries };
