const { executeQuery } = require("../services/query-execute");
const { tableNames } = require("../utils/table-names");
const { authRequests, httpCodes } = require("../utils/messages");

module.exports = {
  checkRegister: async (req, res, next) => {
    const { user_name, email } = req.body;

    const query = `SELECT * FROM ?? WHERE user_name = ? OR email = ?;`;
    const params = [tableNames.USERS, user_name, email];

    const result = await executeQuery(query, params);
    if (result.length != 0) {
      if (result.filter((data) => data.email == email).length > 0) {
        return res
          .status(httpCodes.badRequest)
          .send({ message: authRequests.emailExists });
      } else if (
        result.filter((data) => data.user_name == user_name).length > 0
      ) {
        return res
          .status(httpCodes.badRequest)
          .send({ message: authRequests.usernameExists });
      }
    } else {
      next();
    }
  },
};
