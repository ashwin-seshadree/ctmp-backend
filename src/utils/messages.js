const errorMessages = {
  noToken: "Access denied, No token provided",
  invalidToken: "Access denied, Invalid token",
};

const prompts = {
  host: "Enter the host for the database",
  user: "Enter the user for the database",
  password: "Enter the password for the database",
  database: "Enter the database name",
};

const errorCodes = {
  unAuthorized: 401,
  badRequest: 400,
};

const seeder = {
  admin: {
    first_name: "Enter First Name",
    last_name: "Enter Last Name",
    username: "Enter Username",
    email: "Enter Email",
  },
};

module.exports = {
  errorMessages,
  errorCodes,
  prompts,
  seeder
};
