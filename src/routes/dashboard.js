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
  const unidad_medida = await pool.query('SELECT * FROM unidad_medida');
  

  res.render('dashboard/factura', {
    modo_pago,
    productos,
    unidad_medida
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
  const productos = await pool.query('SELECT pro_id, pro_nombre, pro_stock, pro_precio FROM producto');
  const unidad_medida = await pool.query('SELECT * FROM unidad_medida');
  
  res.render('dashboard/factura', {
    modo_pago,
    productos,
    newFactura,
    unidad_medida
  });
});


router.post('/', async (req, res) => {

 
  console.log(req.body);
  let tipo_cmp = req.body.tipo_cmp;

  if (tipo_cmp == 1) {
    let pe_jur_id = (await pool.query('SELECT pe_jur_id FROM persona_juridica WHERE pe_jur_ruc = ?',[req.body.documento]))[0].pe_jur_id;
    

    let fac_tipo_moneda = req.body.tipo_moneda;
    let fac_fecha = req.body.fecha;
    let mod_id =  (await pool.query('SELECT mod_id FROM modo_pago WHERE mod_nombre = ?',[req.body.modopago]))[0].mod_id;
    
    let aCantidad = req.body.cantidad;
    let aUnidad = req.body.unidad;
    let aDescripcion = req.body.descripcion;
    let aValor = req.body.valor;
    let aMonto = req.body.monto;

    let fac_mtotal = req.body.mtotal;

    const factura = {
      fac_fecha,
      fac_mtotal,
      fac_tipo_moneda,
      pe_jur_id,
      mod_id
    }

    console.log(factura);

   await pool.query('INSERT INTO factura SET ?',[factura]);
    
    let tam = Object.keys(aCantidad).length;
    // Id de la factura
    let fac_id = (await pool.query('SELECT fac_id FROM factura ORDER BY fac_id DESC LIMIT 1'))[0].fac_id;
    


    for (let index = 0; index < tam; index++) {
      const pro_id = aDescripcion[index].split(',')[0];
      const detf_monto = aMonto[index];
      const detf_cantidad = aCantidad[index];
      const umed_id = aUnidad[index];
  
      const newDetalle = {
        fac_id,
        pro_id,
        detf_monto,
        detf_cantidad,
        umed_id
      }
      await pool.query('INSERT INTO detalle_factura SET ?',[newDetalle]);

    }
  }
  else if (tipo_cmp == 2) {
    console.log("Comprobante");
  } else {

  }
  res.redirect('/dashboard/');
});

router.get('/boleta', async (req, res) => {

  // Para llenar los combo box 'modo de pago' y 'productos'
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
