const connection = require("../configs/mysql.config");

const executeQuery = async (query, params) => {
  return new Promise(async (resolve, reject) => {
    try {
      let conn = await getConnection();
      conn.query(query, params, (err, result) => {
        conn.release();
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
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
