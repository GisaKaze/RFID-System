const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'fredson',
    password: '',
    database: 'rfid_system'
});

if(connection){
    console.log('Sucessfully connected to database')
}
else{
    console.log('Failed to connect to database')
}

module.exports = {
    connection
}
