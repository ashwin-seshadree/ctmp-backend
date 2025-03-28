const { executeQuery } = require("../services/query-execute");
const { tableNames } = require("../utils/table-names");

module.exports = {
  getUtils: async () => {
    let query = `SELECT * FROM ??;`;

    const [taskPriority, taskStatus] = await Promise.all([
      executeQuery(query, [tableNames.TASK_PRIORITY]),
      executeQuery(query, [tableNames.TASK_STATUS]),
    ]);

    return {
      taskPriority,
      taskStatus,
    };
  },

  createTask: async (data) => {
    let query = `INSERT INTO ?? SET ?;`;

    return await executeQuery(query, [
      tableNames.TASKS,
      {
        title: data.title,
        description: data.description ? data.description : null,
        priority: data.priority,
        status: data.status,
        created_by: data.user_id,
      },
    ]);
  },

  assignTask: async (data) => {
    let query = `INSERT INTO ?? SET ?;`;

    return await executeQuery(query, [
      tableNames.TASK_ASSIGNMENT,
      {
        task_id: data.task_id,
        user_id: data.assigned_to,
      },
    ]);
  },

  getList: async (data) => {
    const { page, size, is_active, priority, status, assigned_to, search } =
      data;

    let pageSize = size ? size : 10;
    let pageNumber = page ? page : 1;
    let offSet = (parseInt(pageNumber) - 1) * parseInt(pageSize);
    let queryLimit = ` LIMIT ${offSet}, ${pageSize}`;
    let activeStatus = is_active ? is_active : 1;

    let query = `SELECT t.id, t.title, t.description, tp.priority, ts.status, CONCAT(u.first_name, " ", u.last_name) as created_user FROM ?? t JOIN ?? tp ON t.priority = tp.id JOIN ?? ts ON t.status = ts.id JOIN ?? u ON t.created_by = u.id WHERE`;
    let values = [
      tableNames.TASKS,
      tableNames.TASK_PRIORITY,
      tableNames.TASK_STATUS,
      tableNames.USERS,
    ];

    if (is_active) {
      query += ` t.is_active = ?`;
      values.push(is_active);
    }

    if (status) {
      query += ` t.status = ?`;
      values.push(status);
    }

    if (search) {
      query += ` AND t.title = ?`;
      values.push(search);
    }

    query += ` ORDER BY t.id DESC${queryLimit}`;

    return await executeQuery(query, values);
  },

  getTaskCount: async (status) => {
    let query = `SELECT COUNT(*) as count FROM ?? WHERE status = ?`;

    return await executeQuery(query, [tableNames.TASKS, status]);
  },
};
