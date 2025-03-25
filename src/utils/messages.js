const errorMessages = {
  noToken: "Access denied, No token provided",
  invalidToken: "Access denied, Invalid token",
  internalServerError: "Encountered an error, please try again later or contact Support",
  noAccountFound: "No account found with the provided email or user name",
  invalidCredentials: "Invalid credentials",
  userNotFound: "User not found",
  userNameExists: "User Name already exists, please provide a different User Name",
};

const prompts = {
  host: "Enter the host for the database",
  user: "Enter the user for the database",
  password: "Enter the password for the database",
  database: "Enter the database name",
};

const success = {
  userCreated: "User created successfully",
  loginSuccess: "Login successful",
  fetchedUserSuccessfully: "Fetched user successfully",
  userUpdated: "User updated successfully",
}

const httpCodes = {
  success: 200,
  created: 201,
  badRequest: 400,
  unAuthorized: 401,
  notFound: 404,
  internalServerError: 500,
};

const seeder = {
  admin: {
    first_name: "Enter First Name",
    last_name: "Enter Last Name",
    user_name: "Enter User Name",
    email: "Enter Email",
  },
};

const authRequests = {
  feildsRequired: "All fields are required",
  emailExists: "Email already registered with us",
  usernameExists: "User Name already registered with us",
  usernameAndPasswordRequired: "User Name or Email Id and Password are required",
};

module.exports = {
  errorMessages,
  httpCodes,
  prompts,
  seeder,
  authRequests,
  success
};
