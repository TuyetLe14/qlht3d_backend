require('dotenv').config({
	allowEmptyValues: true
  });
  
  module.exports = {
	dev: {
	  username: process.env.MYSQL_USER,
	  password: process.env.MYSQL_PASSWORD,
	  database: process.env.MYSQL_DATABASE,
	  host: process.env.HOST,
	  port: process.env.MYSQL_PORT,
	  dialect: 'mysql',
	  connectionLimit: 10,
	},
	production: {
	  username: process.env.MYSQL_USER,
	  password: process.env.MYSQL_PASSWORD,
	  database: process.env.MYSQL_DATABASE,
	  host: process.env.HOST,
	  port: process.env.MYSQL_PORT,
	  dialect: 'mysql',
	  connectionLimit: 10,
	},
	local: {
	  username: process.env.MYSQL_USER,
	  password: process.env.MYSQL_PASSWORD,
	  database: process.env.MYSQL_DATABASE,
	  host: process.env.HOST,
	  port: process.env.MYSQL_PORT,
	  dialect: 'mysql',
	  connectionLimit: 10,
	},
  }
  