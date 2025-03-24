const mysql = require("mysql2/promise");
const { password, input } = require("@inquirer/prompts");
const { migrationQueries, initialisationQueries } = require("./queries");
const { prompts } = require("../src/utils/messages");

async function runMigrations() {
  let details = await getDbDetails();
  const { host, user, password } = details;
  if (!host || !user || !password) {
    console.error("Invalid database details");
    return;
  } else {
    const conn = await mysql.createConnection(details);
    await conn.query(initialisationQueries.create_db);
    await conn.query(initialisationQueries.use_db);
    await conn.query(initialisationQueries.create_migration_table);

    const [rows] = await conn.query(`SELECT version FROM migrations`);
    const appliedVersions = rows.map((row) => row.version);

    for (const migration of migrationQueries) {
      if (!appliedVersions.includes(migration.version)) {
        console.log(`Running migration: ${migration.description}`);
        await conn.query(migration.query);
        await conn.query(
          `INSERT INTO migrations (version, description) VALUES (?, ?)`,
          [migration.version, migration.description]
        );
      }
      //   else {
      //     console.log(`Migration already applied: ${migration.description}`);
      //   }
    }

    console.log("Migrations complete!");
    await conn.end();
  }
}

runMigrations().catch((err) => {
  console.error("Migration failed:", err);
});

async function getDbDetails() {
  return new Promise(async (resolve, reject) => {
    try {
      let connDetails = {
        host: process.env.DB_HOST
          ? process.env.DB_HOST
          : await input({ message: prompts.host }),
        user: process.env.DB_USER
          ? process.env.DB_USER
          : await input({ message: prompts.user }),
        password: process.env.DB_PASS
          ? process.env.DB_PASS
          : await password({ message: prompts.password }),
      };
      resolve(connDetails);
    } catch (error) {
      if (error instanceof Error && error.name === "ExitPromptError") {
        console.error("User exited the prompt");
      } else {
        reject(error);
      }
    }
  });
}
