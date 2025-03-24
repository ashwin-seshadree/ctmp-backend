const connection = require("../configs/mysql.config");

const executeQuery = async (query, params) => {
  return new Promise(async (resolve, reject) => {
    try {
      let conn = await getConnection();
      let [rows] = await conn.query(query, params);
      await conn.release();
      resolve(rows);
    } catch (error) {
      reject(error);
    }
  });
};

function getConnection() {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, conn) => {
      if (err) {
        reject(err);
      } else {
        resolve(conn);
      }
    });
  });
}

module.exports = { executeQuery };
