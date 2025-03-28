const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");
const { user } = require("../../middlewares/request.validation");

router.get("/get-single-user", userController["get-single-user"]);
router.patch(
  "/update-single-user",
  user.updateUser,
  userController["check-user-exists"],
  userController["update-single-user"]
);
router.get("/get-all-users", userController["get-all-users"])

module.exports = router;
