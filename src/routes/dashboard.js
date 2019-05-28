const express = require('express');

const pool = require('../database');

const router = express.Router();

// Ruta localhost:5000/dashboard
router.get('/', async (req, res) => {

  res.render('dashboard/inicio');
});
// Ruta localhost:5000/dashboard/inventario
router.get('/inventario', async (req, res) => {

  const resultados = await pool.query('SELECT pro_id, cat_tipo, pro_nombre, pro_precio, pro_stock FROM producto P INNER JOIN categoria C ON P.cat_id = C.cat_id');
  console.log(resultados);
  res.render('dashboard/inventario', {
    resultados
  });

});

router.get('/clientes', async (req, res) => {
  res.render('dashboard/clientes');
});

router.get('/factura', async (req, res) => {
  res.render('dashboard/factura');
});

router.get('/boleta', async (req, res) => {
  //Pido el DNI
/* const {
    documento
  } = req.body;

  const que = {
    documento
  };

  const result = await pool.query('SELECT pe_nat_nombres,pe_nat_direccion FROM persona_natural WHERE p_nat_dni = ?', [que]);
  const result2 = await pool.query('SELECT pe_jur_razon_social,pe_jur_direccion FROM persona_juridica WHERE p_jur_ruc = ?', [que]);

  if (result === null) {
    if (result2 != null) {
      router.get('/', async(req,res)=>{
      res.render('dashboard/boleta', {result2});
    }
  } else if(result != null ) {
    router.get('/', async(req,res)=>{
    res.render('dashboard/boleta', {result});
  }else{
    res.render('dashboard/boleta');

  }
*/

//Ahora que ya está elijo todo lo demas
//Añadir un producto

res.render('dashboard/boleta');
});







module.exports = router;
