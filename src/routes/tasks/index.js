const express = require("express");
const router = express.Router();
const tasksController = require("../../controllers/tasks.controller");
const { tasks } = require("../../middlewares/request.validation");

router.get("/utils", tasksController.getUtils);
router.post("/create-task", tasks.createTask, tasksController.createTask);
router.get("/get-user-tasks", tasksController.getUserTasks)
router.get("/get-dashboard-count", tasksController.getDashboardCount)

module.exports = router;
