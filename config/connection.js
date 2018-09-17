// +++++++++++++++++DATABASE CONNECTION++++++++++++++++++

var mysql = require("mysql");
var connection;

if (process.env.burgers_db_URL) {
    connection = mysql.createConnection(process.env.burgers_db_URL);
} else {
    connection = mysql.createConnection({
        port: 8889,
        host: "localhost",
        user: "root",
        password: "root",
        database: "burgers_db"
    });
};

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++