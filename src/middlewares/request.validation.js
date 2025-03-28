const { authRequests, httpCodes } = require("../utils/messages");

const auth = {
  register: async (req, res, next) => {
    const { first_name, last_name, user_name, email } = req.body;
    if (!first_name || !last_name || !user_name || !email) {
      return res
        .status(httpCodes.badRequest)
        .send({ message: authRequests.feildsRequired });
    }
    next();
  },
  login: async (req, res, next) => {
    const { user_name, password } = req.body;
    if (!user_name || !password) {
      return res
        .status(httpCodes.badRequest)
        .send({ message: authRequests.usernameAndPasswordRequired });
    }
    next();
  },
  refreshToken: async (req, res, next) => {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(httpCodes.badRequest).send({
        message: authRequests.pleaseProvieRefreshToken,
      });
    }
    next();
  },
};

const user = {
  updateUser: async (req, res, next) => {
    const { first_name, last_name, user_name } = req.body;
    if (!first_name || !last_name || !user_name) {
      return res
        .status(httpCodes.badRequest)
        .send({ message: authRequests.feildsRequired });
    }
    next();
  },
};

const tasks = {
  createTask: async (req, res, next) => {
    const { title, priority, status } = req.body;
    if (!title || !priority || !status) {
      return res.status(httpCodes.badRequest).send({
        message: authRequests.feildsRequired,
      });
    }
    next();
  },
};

module.exports = {
  auth,
  user,
  tasks,
};
