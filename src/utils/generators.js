const passwordGenerator = require("generate-password");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const newPassword = () => {
  return passwordGenerator.generate({
    length: 16,
    numbers: true,
    uppercase: true,
    lowercase: true,
    symbols: true,
    strict: true,
    excludeSimilarCharacters: true,
  });
};

const hashPassword = async (password) => {
  return await argon2.hash(password);
};

const verifyPassword = async (hash, password) => {
  return await argon2.verify(hash, password);
};

const signJwt = async (data, type = "token") => {
  const jwtSecret =
    type == "token"
      ? process.env.JWT_SECRET
      : type == "refresh"
      ? process.env.JWT_REFRESH_SECRET
      : 0;
  const jwtOptions = {
    expiresIn:
      type == "token"
        ? process.env.JWT_EXPIRY
        : type == "refresh"
        ? process.env.JWT_REFRESH_EXPIRY
        : 0,
    algorithm: process.env.JWT_ALGORITHM,
  };
  return jwt.sign(data, jwtSecret, jwtOptions);
};

const verifyJwt = async (token) => {
  const jwtSecret = process.env.JWT_SECRET;
  return jwt.verify(token, jwtSecret);
};

module.exports = {
  newPassword,
  hashPassword,
  verifyPassword,
  signJwt,
  verifyJwt,
};
