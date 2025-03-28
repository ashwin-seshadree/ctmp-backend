const { executeQuery } = require("../services/query-execute");
const { tableNames } = require("../utils/table-names");

module.exports = {
  "get-user-data": async (data) => {
    const { user_id } = data;
    const query = `SELECT u.id as user_id, u.first_name, u.last_name, u.user_name, u.email, ut.user_type_name as user_role FROM ?? u JOIN ?? ut ON u.user_type = ut.id WHERE u.id = ?;`;

    const params = [tableNames.USERS, tableNames.USER_TYPES, user_id];

    return await executeQuery(query, params);
  },

  "check-username-exists": async (data) => {
    const { user_name } = data;
    const query = `SELECT * FROM ?? WHERE user_name = ?;`;

    const params = [tableNames.USERS, user_name];

    return await executeQuery(query, params);
  },

  "update-user-data": async (data) => {
    const { first_name, last_name, user_name, user_id } = data;
    const query = `UPDATE ?? SET ? WHERE id = ?;`;

    const params = [
      tableNames.USERS,
      {
        first_name,
        last_name,
        user_name,
      },
      user_id,
    ];

    return await executeQuery(query, params);
  },

  "get-all-users": async (isAdmin) => {
    let query = `SELECT id, first_name, last_name, CONCAT(first_name, " ", last_name) as full_name FROM ?? WHERE status = ?`;
    let params = [tableNames.USERS, 1];

    if (!isAdmin) {
      query += ` AND user_type = ?`;
      params.push(2);
    }

    return await executeQuery(query, params);
  },
};
