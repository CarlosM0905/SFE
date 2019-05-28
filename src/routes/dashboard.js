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
//Se supone que el usuario hace clic en agregar aparece el modal y esto sucede
  //leo el nombre
/*  const{
    pro_nombre
  } = req.body;

  //lo guardo en esta constante
  const producto ={
    pro_nombre
  }

  //busco el id del producto para enviarlo ami proxima queries, asi como precio y medida
  const resultpro = await pool.query('SELECT pro_id pro_precio,pro_umed FROM producto WHERE pro_nombre = ?', [producto]);

  //se supone que tengo que enviarlo a los campos uwuwuwuw
  //espacio para enviar xdxdxd
  //leo el precio y la cantidad
  const{
    pro_precio,
    detb_cantidad
  } = req.body;

  const monto ={
    pro_nombre,
    detb_cantidad
  }


  //ahora tengo que hallar el monto totoal uwuwuwuw
  const detb_precio = monto.pro_precio*monto.detb_cantidad;


  // se supone que envio el monto total
  router.get('/', async(req,res)=>{
  res.render('dashboard/boleta', {detb_precio});

  //leo los valores de todos los input
  const {
      detb_cantidad,
      pro_umed,
      pro_nombre,
      pro_precio,
      detb_precio
    } = req.body;
  //creo lo que enviaré a mi db

const detalle = {
    detb_cantidad,
    pro_umed,
    pro_nombre,
    pro_precio,
    detb_precio
  };

  // Enviar la query
  //al parecer tengo que enviar queries a diferentes tablas :((( xdxdxd)))

  await pool.query('INSERT INTO detalle_boleta set ?',[detalle]);
*/
res.render('dashboard/boleta');
});







module.exports = router;
