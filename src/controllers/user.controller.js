const userModel = require("../models/user.model");
const {
  httpCodes,
  success,
  errorMessages,
  authRequests,
} = require("../utils/messages");

module.exports = {
  "get-single-user": async (req, res) => {
    try {
      const { user } = req;
      const userData = await userModel["get-user-data"]({
        user_id: user.user_id,
      });

      if (userData.length === 0) {
        return res.status(httpCodes.notFound).send({
          message: errorMessages.userNotFound,
        });
      } else {
        return res.status(httpCodes.success).send({
          message: success.fetchedUserSuccessfully,
          data: userData[0],
        });
      }
    } catch (ex) {
      res.status(httpCodes.internalServerError).send({
        message: errorMessages.internalServerError,
      });
    }
  },

  "check-user-exists": async (req, res, next) => {
    try {
      const { user } = req;
      const { user_name } = req.body;

      const userData = await userModel["check-username-exists"]({ user_name });

      if (userData.length === 0) next();
      else {
        if (userData[0].id === user.user_id) next();
        else {
          return res.status(httpCodes.badRequest).send({
            message: errorMessages.userNameExists,
          });
        }
      }
    } catch (ex) {
      res.status(httpCodes.internalServerError).send({
        message: errorMessages.internalServerError,
      });
    }
  },

  "update-single-user": async (req, res) => {
    try {
      const { user } = req;
      const { first_name, last_name, user_name } = req.body;

      await userModel["update-user-data"]({
        first_name,
        last_name,
        user_name,
        user_id: user.user_id,
      });

      return res.status(httpCodes.success).send({
        message: success.userUpdated,
      });
    } catch (ex) {
      res.status(httpCodes.internalServerError).send({
        message: errorMessages.internalServerError,
      });
    }
  },

  "get-all-users": async (req, res) => {
    try {
      const { user } = req;
      const isAdmin = user.user_role == "Super Admin" ? true : false;

      const userList = await userModel["get-all-users"](isAdmin);

      return res.status(httpCodes.success).send({
        message: success.dataFetchedSuccessfully,
        data: userList,
      });
    } catch (ex) {
      res.status(httpCodes.internalServerError).send({
        message: errorMessages.internalServerError,
      });
    }
  },
};
