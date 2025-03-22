const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth/index"));
router.use("/task", require("./tasks/index"));
router.use("/users", require("./users/index"));

module.exports = router;
