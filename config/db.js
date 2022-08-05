const mysql = require('serverless-mysql')();

mysql.config({
  host: 'localhost',
  database: 'employee',
  user: 'root',
  password: '123456',
});

const executeQuery = (query, arraParms) => {
  return new Promise((resolve, reject) => {
    try {
      mysql.query(query, arraParms, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { executeQuery };
