require('dotenv').config();

module.exports = {
	development: {
		"username": process.env.LOCAL_DB_USERNAME,
		"password": process.env.LOCAL_DB_PASSWORD,
		"database": process.env.LOCAL_DB,
		"host": process.env.LOCAL_DB_HOST,
		"dialect": "mysql",
		"operatorsAliases": false
	},
	"test": {
		"username": "root",
		"password": null,
		"database": "database_test",
		"host": "127.0.0.1",
		"dialect": "mysql",
		"operatorsAliases": false
	},
	"production": {
		"username": "root",
		"password": null,
		"database": "database_production",
		"host": "127.0.0.1",
		"dialect": "mysql",
		"operatorsAliases": false
	}
};