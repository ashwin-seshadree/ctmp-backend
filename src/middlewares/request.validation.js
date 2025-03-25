const { authRequests, httpCodes } = require("../utils/messages");

const auth = {
  register: async (req, res, next) => {
    const { first_name, last_name, user_name, email } = req.body;
    if (!first_name || !last_name || !user_name || !email) {
      return res
        .status(httpCodes.badRequest)
        .json({ message: authRequests.feildsRequired });
    }
    next();
  },
  login: async (req, res, next) => {
    const { user_name, password } = req.body;
    if (!user_name || !password) {
      return res
        .status(httpCodes.badRequest)
        .json({ message: authRequests.usernameAndPasswordRequired });
    }
    next();
  },
};

module.exports = {
  auth,
};
