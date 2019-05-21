const express = require('express');

const router = express.Router();

// Ruta localhost:5000/dashboard
router.get('/', async(req,res)=>{
    
    res.render('dashboard/inicio');
});
// Ruta localhost:5000/dashboard/inventario
router.get('/inventario', async(req,res)=>{


    res.render('dashboard/inventario');
    


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