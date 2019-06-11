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

// Ruta localhost:5000/dashboard/clientes
router.get('/clientes', async (req, res) => {
  const results = await pool.query('SELECT pe_jur_ruc, pe_jur_razon_social, pe_jur_direccion, pe_jur_email FROM persona_juridica UNION SELECT pe_nat_dni,CONCAT(pe_nat_nombres , " ", pe_nat_apellidos), pe_nat_direccion, pe_nat_email FROM persona_natural');
  res.render('dashboard/clientes', {
    results
  });

});

//Ruta localhost:5000/dashboard/factura
router.get('/factura', async (req, res) => {

  // Para llenar los combo box 'modo de pago' y 'productos'
  const modo_pago = await pool.query('SELECT * FROM modo_pago');
  const productos = await pool.query('SELECT pro_nombre, pro_stock, pro_precio FROM producto');

  res.render('dashboard/factura', {modo_pago,productos});
});


router.post('/factura', async (req, res) => {

  const {documento} = req.body;

  const datos = await pool.query('SELECT pe_jur_ruc,pe_jur_id, pe_jur_razon_social, pe_jur_direccion FROM persona_juridica WHERE pe_jur_ruc = ?',[documento]);

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
  console.log(newFactura);
  res.render('dashboard/factura',{newFactura});
});



router.post('/',(req,res)=>{
  console.log(req.body);  
  res.redirect('/dashboard/clientes');
});

router.get('/boleta', async (req, res) => {

  // Para llenar los combo box 'modo de pago' y 'productos'
  const modo_pago = await pool.query('SELECT * FROM modo_pago');
  const productos = await pool.query('SELECT pro_nombre, pro_stock, pro_precio FROM producto');

  res.render('dashboard/boleta', {modo_pago,productos});
});

router.post('/boleta', async (req, res) => {

  const {documento} = req.body;
  const {modopago} = req.body;
  const {bol_fecha,bol_mtotal} = req.body;
  const per_id_b = await pool.query('SELECT pe_nat_id FROM persona_natural WHERE pe_nat_dni = ?', [documento] );
  const mod_id_b = await pool.query('SELECT mod_id FROM modo_pago WHERE mod_nombre = ?', [modopago]);

  const newBoleta = {
      bol_fecha,
      bol_mtotal,
      per_id_b,
      mod_id_b
  }

  await pool.query('INSERT INTO boleta SET ?',[newBoleta]);

});
  //const result = await pool.query('SELECT pe_nat_nombres,pe_nat_direccion FROM persona_natural WHERE pe_nat_dni = ?', [documento]);

  //const result2 = await pool.query('SELECT pe_jur_razon_social,pe_jur_direccion FROM persona_juridica WHERE pe_jur_ruc = ?', [documento]);


  // Si no encuentra coincidencias en las personas naturales
  /*if (result === null) {


    // Pero si en las personas juridicas
    if (result2 != null) {
      // Se muestra
      const query = result2;

            res.render('dashboard/boleta', { query });

    }
  else if (result != null) {
    // Se muestra
    const query = JSON.parse(JSON.stringify(result));
    const nombre = query[0].pe_nat_nombres;
    const direccion = query[0].pe_nat_direccion;

    res.render('dashboard/boleta', { query });

  } else {
    // Si no se actualiza
    res.render('dashboard/boleta');
  }
  */
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








module.exports = router;
