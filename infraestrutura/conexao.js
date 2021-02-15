const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: 'database',
    port: 3306,
    user: 'user',
    password: 'passwd',
    database: 'database'
})

module.exports = conexao
