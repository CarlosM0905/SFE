const mysql = require('mysql');
// Permite usar promesas en vez de callbacks
const {promisify} = require('util')


const{database}  = require('./keys')

// database es un objeto json que tiene todos los datos de la BD
// Genera una conexion a la base de datos
const  pool =  mysql.createPool(database);



pool.getConnection((err, connection)=>{
    // Validacion de errores en al conexion
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');

        }
        if(err.code === 'ECONNREFUSED'){
            console.log('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if(connection){
        
        connection.release();
        
        
    }
    console.log('DB is Connected');
    
    return;
    
});

// Promisify Pool Query
pool.query = promisify(pool.query);

module.exports = pool;