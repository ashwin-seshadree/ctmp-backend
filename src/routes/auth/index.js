const express = require("express");
const router = express.Router();
const duplicateValidation = require("../../middlewares/duplicate.validation");
const requestValidation = require("../../middlewares/request.validation");
const authController = require("../../controllers/auth.controller");

router.post(
  "/register",
  requestValidation.auth.register,
  duplicateValidation.checkRegister,
  authController.register
);
router.post("/login", requestValidation.auth.login, authController.login);
router.post(
  "/refresh-token",
  requestValidation.auth.refreshToken,
  authController.refreshToken
);

module.exports = router;
