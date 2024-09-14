/**
 * exportでエラーがでた
 * 
 *module.exports = router;
 module.exports = app;
 ↑上記2つはオブジェクト形式にして複数返すなどの事ができない
 * 
 */
const mysql = require('mysql2');
const session = require("express-session");
const MySQLStore = require('express-mysql-session')(session); //追加分

// MySQL connection setup
const conections =  mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test'
});
// const sessionStore= new MySQLStore(conections);


module.exports = conections;
