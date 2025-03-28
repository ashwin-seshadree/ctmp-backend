const { httpCodes, success, errorMessages } = require("../utils/messages");
const tasksModel = require("../models/tasks.model");

module.exports = {
  getUtils: async (req, res) => {
    try {
      const utilsList = await tasksModel.getUtils();

      res.status(httpCodes.success).send({
        message: success.dataFetchedSuccessfully,
        data: utilsList,
      });
    } catch (e) {
      res.status(httpCodes.internalServerError).send({
        message: errorMessages.internalServerError,
      });
    }
  },

  createTask: async (req, res) => {
    try {
      const { title, description, status, priority, assigned_to } = req.body;
      const { user } = req;

      const createdTask = await tasksModel.createTask({
        title,
        description,
        status,
        priority,
        user_id: user.user_id,
      });
      const assignTask = await tasksModel.assignTask({
        assigned_to: assigned_to ? assigned_to : user.user_id,
        task_id: createdTask.insertId,
      });

      res.status(httpCodes.created).send({
        message: success.taskCreatedSuccessfully,
      });
    } catch (e) {
      res.status(httpCodes.internalServerError).send({
        message: errorMessages.internalServerError,
        error: e,
      });
    }
  },

  getUserTasks: async (req, res) => {
    try {
      const {
        page,
        size,
        is_active,
        priority,
        status = "all",
        assigned_to,
        search,
      } = req.query;

      const { user } = req;

      let taskStatus = 1;
      let getToDoList = await tasksModel.getList({
        page,
        size,
        is_active,
        priority,
        status: taskStatus,
        assigned_to,
        search,
      });
      taskStatus = 2;
      let inProgressList = await tasksModel.getList({
        page,
        size,
        is_active,
        priority,
        status: taskStatus,
        assigned_to,
        search,
      });
      taskStatus = 3;
      let doneList = await tasksModel.getList({
        page,
        size,
        is_active,
        priority,
        status: taskStatus,
        assigned_to,
        search,
      });

      res.status(httpCodes.success),
        send({
          message: success.dataFetchedSuccessfully,
          data: {
            toDoList: getToDoList,
            inProgress: inProgressList,
            done: doneList,
          },
        });
    } catch (e) {
      console.log("###", e);
      res.status(httpCodes.internalServerError).send({
        message: errorMessages.internalServerError,
        error: e,
      });
    }
  },

  getDashboardCount: async (req, res) => {
    try {
      const toDoCount = await tasksModel.getTaskCount(1);
      const inProgressCount = await tasksModel.getTaskCount(2);
      const doneCount = await tasksModel.getTaskCount(3);

      res.status(httpCodes.success).send({
        message: success.dataFetchedSuccessfully,
        data: {
          toDoCount: toDoCount[0],
          inProgressCount : inProgressCount[0],
          doneCount: doneCount[0],
        },
      });
    } catch (e) {
      console.log("###", e);
      res.status(httpCodes.internalServerError).send({
        message: errorMessages.internalServerError,
        error: e,
      });
    }
  },
};
