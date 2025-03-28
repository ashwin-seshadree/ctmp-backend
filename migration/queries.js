const migrationQueries = [
  {
    version: 1,
    description: "Create users table",
    query:
      "CREATE TABLE IF NOT EXISTS users \
        (id INT AUTO_INCREMENT PRIMARY KEY, \
        first_name VARCHAR(100) NOT NULL, \
        last_name VARCHAR(100) NOT NULL, \
        user_name VARCHAR(50) UNIQUE KEY NOT NULL, \
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
  {
    version: 6,
    description: "Add Tier-1 User Role",
    query:
      "INSERT INTO `user_types` (`user_type_name`) VALUES ('Tier-1 User');",
  },
  {
    version: 7,
    description: "Add Task Status Table",
    query:
      "CREATE TABLE `task_status` (`id` INT NOT NULL AUTO_INCREMENT, `status` VARCHAR(45) NOT NULL, PRIMARY KEY (`id`));",
  },
  {
    version: 8,
    description: "Add Task Priority Table",
    query:
      "CREATE TABLE `task_priority` (`id` INT NOT NULL AUTO_INCREMENT, `priority` VARCHAR(45) NOT NULL, PRIMARY KEY (`id`));",
  },
  {
    version: 9,
    description: "Insert Task Priority Data",
    query:
      "INSERT INTO `task_priority` (`priority`) VALUES ('High'), ('Medium'), ('Low');",
  },
  {
    version: 10,
    description: "Insert Task Status Data",
    query:
      "INSERT INTO `task_status` (`status`) VALUES ('To Do'), ('In Progress'), ('Done');",
  },
  {
    version: 11,
    description: "Create Tasks Table",
    query:
      "CREATE TABLE `tasks` (\
      `id` INT NOT NULL AUTO_INCREMENT,\
      `title` VARCHAR(100) NOT NULL,\
      `description` LONGTEXT NULL,\
      `priority` INT NOT NULL,\
      `status` INT NOT NULL,\
      `is_active` TINYINT NOT NULL DEFAULT 1,\
      `created_by` INT NOT NULL,\
      `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\
      `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\
      PRIMARY KEY (`id`),\
      INDEX `priority_idx` (`priority` ASC) VISIBLE,\
      INDEX `status_idx` (`status` ASC) VISIBLE,\
      INDEX `created_by_idx` (`created_by` ASC) VISIBLE,\
      CONSTRAINT `priority`\
        FOREIGN KEY (`priority`)\
        REFERENCES `task_priority` (`id`)\
        ON DELETE NO ACTION\
        ON UPDATE NO ACTION,\
      CONSTRAINT `status`\
        FOREIGN KEY (`status`)\
        REFERENCES `task_status` (`id`)\
        ON DELETE NO ACTION\
        ON UPDATE NO ACTION,\
      CONSTRAINT `created_by`\
        FOREIGN KEY (`created_by`)\
        REFERENCES `users` (`id`)\
        ON DELETE NO ACTION\
        ON UPDATE NO ACTION);",
  },
  {
    version: 12,
    description: "Create Comments Table",
    query:
      "CREATE TABLE `comments` (\
      `id` INT NOT NULL AUTO_INCREMENT,\
      `comment` LONGTEXT NOT NULL,\
      `created_by` INT NOT NULL,\
      `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\
      `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\
      PRIMARY KEY (`id`),\
      INDEX `created_user_idx` (`created_by` ASC) VISIBLE,\
      CONSTRAINT `created_user`\
        FOREIGN KEY (`created_by`)\
        REFERENCES `users` (`id`)\
        ON DELETE NO ACTION\
        ON UPDATE NO ACTION);",
  },
  {
    version: 13,
    description: "Alter Comment Table",
    query:
      "ALTER TABLE `comments` \
      ADD COLUMN `task_id` INT NOT NULL AFTER `comment`,\
      ADD INDEX `task_id_idx` (`task_id` ASC) VISIBLE;",
  },
  {
    version: 14,
    description: "Constraint Comment Table",
    query:
      "ALTER TABLE `comments` \
      ADD CONSTRAINT `task_id`\
        FOREIGN KEY (`task_id`)\
        REFERENCES `tasks` (`id`)\
        ON DELETE NO ACTION\
        ON UPDATE NO ACTION;",
  },
  {
    version: 15,
    description: "Update User Table",
    query:
      "ALTER TABLE `users` ADD COLUMN `status` TINYINT NOT NULL DEFAULT 1 AFTER `password`;",
  },
  {
    version: 16,
    description: "Create Task Assignment Table",
    query:
      "CREATE TABLE `task_assignment` (\
      `task_id` INT NOT NULL,\
      `user_id` INT NOT NULL,\
      INDEX `assignedUserId_idx` (`user_id` ASC) VISIBLE,\
      INDEX `assignedTaskId_idx` (`task_id` ASC) VISIBLE,\
      CONSTRAINT `assignedUserId`\
        FOREIGN KEY (`user_id`)\
        REFERENCES `users` (`id`)\
        ON DELETE NO ACTION\
        ON UPDATE NO ACTION,\
      CONSTRAINT `assignedTaskId`\
        FOREIGN KEY (`task_id`)\
        REFERENCES `tasks` (`id`)\
        ON DELETE NO ACTION\
        ON UPDATE NO ACTION);",
  },
];

const initialisationQueries = {
  create_db: "CREATE DATABASE IF NOT EXISTS ctmp_db",
  use_db: "USE ctmp_db",
  create_migration_table:
    "CREATE TABLE IF NOT EXISTS migrations (version INT PRIMARY KEY, description VARCHAR(255), applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
};

module.exports = { migrationQueries, initialisationQueries };
