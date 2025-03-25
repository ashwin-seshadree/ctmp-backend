const mysql = require("mysql2/promise");
const { password, input } = require("@inquirer/prompts");
const { seeder, prompts } = require("../src/utils/messages");
const { initialisationQueries } = require("./queries");
const argon2 = require("argon2");

async function seedAdmin() {
  let adminData = await getAdminDetails();

  const { host, user, sql_password, first_name, last_name, user_name, email } =
    adminData;
  const password = "@dminUser@1234";
  const user_type = 1;
  if (!host || !user || !sql_password) {
    console.error("Invalid database details");
    return;
  } else {
    if (!first_name || !last_name || !user_name || !email) {
      console.error("Invalid admin details");
      return;
    } else {
      const conn = await mysql.createConnection({
        host,
        user,
        password: sql_password,
      });
      await conn.query(initialisationQueries.use_db);

      let query = `INSERT INTO users SET ?`;
      let values = {
        first_name,
        last_name,
        user_name,
        email,
        password: await argon2.hash(password),
        user_type,
      };
      await conn.query(query, values);
      console.log("Admin seeded successfully!");
      await conn.end();
    }
  }
}

seedAdmin().catch((err) => {
  console.error("Admin seeding failed:", err);
});

function getAdminDetails() {
  return new Promise(async (resolve, reject) => {
    try {
      let adminDetails = {
        host: await input({ message: prompts.host }),
        user: await input({ message: prompts.user }),
        sql_password: await password({ message: prompts.password }),
        first_name: await input({ message: seeder.admin.first_name }),
        last_name: await input({ message: seeder.admin.last_name }),
        user_name: await input({ message: seeder.admin.user_name }),
        email: await input({ message: seeder.admin.email }),
      };
      resolve(adminDetails);
    } catch (error) {
      if (error instanceof Error && error.name === "ExitPromptError") {
        reject(error);
      }
    }
  });
}
