const express = require('express');

const pool = require('../database');

const router = express.Router();

// Ruta localhost:5000/dashboard
router.get('/', async(req,res)=>{
    
    res.render('dashboard/inicio');
});
// Ruta localhost:5000/dashboard/inventario
router.get('/inventario', async(req,res)=>{

    const productos = await pool.query('SELECT * FROM productos');
    const categorias = await pool.query('SELECT * FROM categorias');
    console.log(productos);
    console.log(categorias);
    //res.render('dashboard/inventario',{productos,categorias});

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