const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

/*var corsOptions = {
    origin: 'http://localhost:3002/'
}*/

app.use(cors());
/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});*/

app.use(express.json());

const db = mysql.createConnection({
    host: 'servicio.mysql.database.azure.com',
    user: 'Jhona@servicio',
    password: 'UHPYtvnk1610',
    port: '3306',
    database: "examen2"
})

/*
host: 'servicio.mysql.database.azure.com',
    user: 'Jhona@servicio',
    password: 'UHPYtvnk1610',
    port: '3306',
    database: "examen2"


     host: 'localhost',
    user: 'root',
    password: 'alex',
    database: "examen"
*/
db.connect(error =>{
    if(error) throw error;
    console.log('Conexion exitosa a la db');
})

app.post('/transferir', (req, res)=>{
    console.log(req.body);
    const descripcion = req.body.descripcion
    const fechaTransaccion = new Date();
    const monto = req.body.monto
    const tipoTransaccion = req.body.tipoTransaccion
    const cuentaNumero = req.body.cuentaBancaria
    
    db.query(
        'INSERT INTO transaccion (descripcion, monto, tipotransaccion, cuenta_numero) VALUES (?,?,?,?)', 
        [descripcion, monto, tipoTransaccion, cuentaNumero], 
        (err, result )=>{
            if(err){
                console.log('error insertando: ', err.message)
            }else{
                res.send({'status':'200', 'message':'Transaccion exitosa'})
            }
        }
    )

});


app.listen(3003, ()=> {
    console.log('Servidor corriendo en puesto 3003')
}); 