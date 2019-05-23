const express = require('express');

const pool = require('../database');

const router = express.Router();

// Ruta localhost:5000/dashboard
router.get('/', async(req,res)=>{
    
    res.render('dashboard/inicio');
});
// Ruta localhost:5000/dashboard/inventario
router.get('/inventario', async(req,res)=>{

    const resultados = await pool.query('SELECT pro_id, cat_tipo, pro_nombre, pro_precio, pro_stock FROM producto P INNER JOIN categoria C ON P.cat_id = C.cat_id');
    console.log(resultados);
    res.render('dashboard/inventario',{resultados});

});

router.get('/clientes', async(req,res)=>{
    res.render('dashboard/clientes');
});

router.get('/factura', async(req,res)=>{
    res.render('dashboard/factura');
});

router.get('/boleta', async(req,res)=>{
    res.render('dashboard/boleta');
});







module.exports = router;