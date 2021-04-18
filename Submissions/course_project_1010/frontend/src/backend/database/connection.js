var mysql = require("mysql");

export const conn = mysql.createConnection({
  host: "localhost",
  user: "nodeclient",
  password: "123456",
  database: "portdb",
});

conn.connect(function (err) {
  if (err) throw err;
  console.log(`Database Connected! ${conn}`);
});
