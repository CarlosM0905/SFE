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
  res.render('dashboard/inventario', {
    resultados
  });

});

router.get('/clientes', async (req, res) => {
  const results = await pool.query('SELECT pe_jur_ruc, pe_jur_razon_social, pe_jur_direccion, pe_jur_email FROM persona_juridica UNION SELECT pe_nat_dni,CONCAT(pe_nat_nombres , " ", pe_nat_apellidos), pe_nat_direccion, pe_nat_email FROM persona_natural');
  res.render('dashboard/clientes', {
    results
  });

});

router.get('/factura', async (req, res) => {
  //PARA LLENAR COMBOBOX
  const modo_pago = await pool.query('SELECT * FROM modo_pago');
  const productos = await pool.query('SELECT pro_nombre, pro_stock, pro_precio FROM producto');


  res.render('dashboard/factura', {
    modo_pago,
    productos
  });
});

router.post('/factura', async (req, res) => {

  const {
    documento
  } = req.body;

  const datos = await pool.query('SELECT pe_jur_ruc,pe_jur_id, pe_jur_razon_social, pe_jur_direccion FROM persona_juridica WHERE pe_jur_ruc = ?', [documento]);

  let ruc = datos[0].pe_jur_ruc;
  let id = datos[0].pe_jur_id;
  let razon_social = datos[0].pe_jur_razon_social;
  let direccion = datos[0].pe_jur_direccion;
  const newFactura = {
    ruc,
    id,
    razon_social,
    direccion
  }

  const modo_pago = await pool.query('SELECT * FROM modo_pago');
  const productos = await pool.query('SELECT pro_nombre, pro_stock, pro_precio FROM producto');

  console.log(newFactura);
  res.render('dashboard/factura', {
    modo_pago,
    productos,
    newFactura
  });


});

router.get('/boleta', async (req, res) => {
  //PARA LLENAR COMBOBOX
  const modo_pago = await pool.query('SELECT * FROM modo_pago');
  const productos = await pool.query('SELECT pro_nombre, pro_stock, pro_precio FROM producto');

  res.render('dashboard/boleta', {
    modo_pago,
    productos
  });
});

router.post('/boleta', async (req, res) => {

  const {
    documentox
  } = req.body;

  const dat = await pool.query('SELECT pe_nat_id, pe_nat_nombres, pe_nat_apellidos, pe_nat_dni, pe_nat_direccion FROM persona_natural WHERE pe_nat_dni = ?', [documentox]);

  console.log("result" + dat);
  let id = dat[0].pe_nat_id;
  let nombres = dat[0].pe_nat_nombres;
  let apellidos = dat[0].pe_nat_apellidos;
  let dni = dat[0].pe_nat_dni;
  let direccion = dat[0].pe_nat_direccion;

  const newBoleta = {
    id,
    nombres,
    apellidos,
    dni,
    direccion
  }

  const modo_pago = await pool.query('SELECT * FROM modo_pago');
  const productos = await pool.query('SELECT pro_nombre, pro_stock, pro_precio FROM producto');

  console.log(newBoleta);
  res.render('dashboard/boleta', {
    modo_pago,
    productos,
    newBoleta
  });


});

module.exports = router;
