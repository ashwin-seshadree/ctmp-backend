const { executeQuery } = require("../services/query-execute");
const { tableNames } = require("../utils/table-names");

module.exports = {
  "create-user": async (data) => {
    const {
      first_name,
      last_name,
      user_name,
      email,
      hashedPassword,
      user_type,
    } = data;
    const query = `INSERT INTO ?? SET ?;`;

    const params = [
      tableNames.USERS,
      {
        first_name,
        last_name,
        user_name,
        email,
        password: hashedPassword,
        user_type,
      },
    ];

    return await executeQuery(query, params);
  },

  "get-user-details": async (data) => {
    const { user_name } = data;
    const query = `SELECT u.id as user_id, u.first_name, u.last_name, u.user_name, u.email, u.password, ut.user_type_name as user_role FROM ?? u JOIN ?? ut ON u.user_type = ut.id WHERE u.email = ? OR u.user_name = ?;`;

    const params = [tableNames.USERS, tableNames.USER_TYPES, user_name, user_name];

    return await executeQuery(query, params);
  },
};
