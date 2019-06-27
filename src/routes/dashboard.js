const express = require('express');

const pool = require('../database');

const router = express.Router();

// Ruta localhost:5000/dashboard
router.get('/', async (req, res) => {

  // Se muestra la pantalla de inicio del sistema
  res.render('dashboard/inicio');
});


// Ruta localhost:5000/dashboard/inventario
router.get('/inventario', async (req, res) => {

  // Se solicita a la bd las categorias, los productos y las unidades de medida
  const categorias = await pool.query('SELECT cat_id, cat_tipo FROM categoria');
  const resultados = await pool.query('SELECT pro_id, cat_tipo, pro_nombre, pro_precio, pro_stock FROM producto P INNER JOIN categoria C ON P.cat_id = C.cat_id');
  const u_med = await pool.query('SELECT umed_id, umed_nombre FROM unidad_medida');

  // Se muesta la vista inventario y se envian los objetos
  res.render('dashboard/inventario', {
    resultados,
    categorias,
    u_med
  });

});

// Ruta localhost:5000/dashboard/clientes
router.get('/clientes', async (req, res) => {

  // Se solicitan a la bd tanto los clientes juridicos como naturales
  const results = await pool.query('SELECT pe_jur_ruc, pe_jur_razon_social, pe_jur_direccion, pe_jur_email FROM persona_juridica UNION SELECT pe_nat_dni,CONCAT(pe_nat_nombres , " ", pe_nat_apellidos), pe_nat_direccion, pe_nat_email FROM persona_natural');

  // Se muestra la vista clientes y se envia el objeto results
  res.render('dashboard/clientes', {
    results
  });

});

//Ruta localhost:5000/dashboard/factura
router.get('/factura', async (req, res) => {

  // Para llenar los combo box 'modo de pago','productos' y 'unidad_medida'
  const modo_pago = await pool.query('SELECT * FROM modo_pago');
  const productos = await pool.query('SELECT pro_id, pro_nombre, pro_stock, pro_precio FROM producto');
  const unidad_medida = await pool.query('SELECT * FROM unidad_medida');

  // Se muestra la vista  y se envian los objetos
  res.render('dashboard/factura', {
    modo_pago,
    productos,
    unidad_medida
  });
});

// Ruta localhost:5000/dashboard/boleta
router.get('/boleta', async (req, res) => {

  // Para llenar los combo box 'modo de pago' , 'productos' y 'unidad_medida'
  const modo_pago = await pool.query('SELECT * FROM modo_pago');
  const productos = await pool.query('SELECT pro_id, pro_nombre, pro_stock, pro_precio FROM producto');
  const unidad_medida = await pool.query('SELECT * FROM unidad_medida');

  // Se muesta la vista boleta y se envian los objetos
  res.render('dashboard/boleta', {
    modo_pago,
    productos,
    unidad_medida
  });
});


// Ruta localhost:5000/dashboard/inventario
router.post('/inventario', async (req, res) => {

  // Se consultan las categorias, los productoss y las unidades de medida de la base de datos
  const categorias = await pool.query('SELECT cat_id, cat_tipo FROM categoria');
  const resultados = await pool.query('SELECT pro_id, cat_tipo, pro_nombre, pro_precio, pro_stock FROM producto P INNER JOIN categoria C ON P.cat_id = C.cat_id');
  const u_med = await pool.query('SELECT umed_id, umed_nombre FROM unidad_medida');

  // Se muestra la vista con los objetos
  res.render('dashboard/inventario', {
    resultados,
    categorias,
    u_med
  });

  //  Se guardan los datos del producto a registrar
  let pro_nombre = req.body.pro_nombre;
  let pro_precio = req.body.pro_precio;
  let pro_stock = req.body.pro_stock;
  let cat_id = (await pool.query('SELECT cat_id FROM categoria WHERE cat_tipo = ?', [req.body.cat_tipo]));

  // Se crea el objeto nuevoProducto
  const newProducto = {
    pro_nombre,
    pro_precio,
    pro_stock,
    cat_id
  }

  // Se inserta el objeto en la base de datos
  await pool.query('INSERT INTO producto SET ?', [newProducto]);
});


router.post('/factura', async (req, res) => {

  // Se consulta el numero de documento del cliente
  const {
    documento
  } = req.body;

  // Se buscan sus datos en la base de datos de acuerdo a su numero de documento
  const datos = await pool.query('SELECT pe_jur_ruc,pe_jur_id, pe_jur_razon_social, pe_jur_direccion FROM persona_juridica WHERE pe_jur_ruc = ?', [documento]);

  // Se establecen los datos del resultado de la consulta a la bd en variables
  let ruc = datos[0].pe_jur_ruc;
  let id = datos[0].pe_jur_id;
  let razon_social = datos[0].pe_jur_razon_social;
  let direccion = datos[0].pe_jur_direccion;

  // Se crea un objeto nuevaFactura
  const newFactura = {
    ruc,
    id,
    razon_social,
    direccion
  }

  // Se consultan los modos de pagos
  const modo_pago = await pool.query('SELECT * FROM modo_pago');

  // Se consultan los productos
  const productos = await pool.query('SELECT pro_id, pro_nombre, pro_stock, pro_precio FROM producto');

  // Se consultan las unidades de medida
  const unidad_medida = await pool.query('SELECT * FROM unidad_medida');

  // Se muestra la vista Factura y se envian los objetos
  res.render('dashboard/factura', {
    modo_pago,
    productos,
    newFactura,
    unidad_medida
  });
});


router.post('/', async (req, res) => {

  //Se solicita el tipo de comprobante
  let tipo_cmp = req.body.tipo_cmp;

  // Si el tipo de comprobante es Factura
  if (tipo_cmp == 1) {

    // Se busca el id de la persona juridica de acuerdo a su numero de documento
    let pe_jur_id = (await pool.query('SELECT pe_jur_id FROM persona_juridica WHERE pe_jur_ruc = ?', [req.body.documento]))[0].pe_jur_id;

    // Se guarda el tipo de moneda
    let fac_tipo_moneda = req.body.tipo_moneda;

    // Se guarda el tipo de fecha
    let fac_fecha = req.body.fecha;

    // Se guarda el id del modo de pago
    let mod_id = (await pool.query('SELECT mod_id FROM modo_pago WHERE mod_nombre = ?', [req.body.modopago]))[0].mod_id;

    // Se guardan los arreglos de las cantidades, num. de unidades, descripciones y montos de los productos
    let aCantidad = req.body.cantidad;
    let aUnidad = req.body.unidad;
    let aDescripcion = req.body.descripcion;
    let aMonto = req.body.monto;

    // Se guarda el monto total de la factura
    let fac_mtotal = req.body.mtotal;

    // Se crea el objeto Factura
    const factura = {
      fac_fecha,
      fac_mtotal,
      fac_tipo_moneda,
      pe_jur_id,
      mod_id
    }

    // Se inserta el objeto Factura en la BD
    await pool.query('INSERT INTO factura SET ?', [factura]);

    // Se obtiene el tamaño de los arreglos
    let tam = Object.keys(aCantidad).length;

    // Se obtiene el id de la factura
    let fac_id = (await pool.query('SELECT fac_id FROM factura ORDER BY fac_id DESC LIMIT 1'))[0].fac_id;


    // Se itera a traves de los arreglos
    for (let index = 0; index < tam; index++) {
      const pro_id = aDescripcion[index].split(',')[0];
      const detf_monto = aMonto[index];
      const detf_cantidad = aCantidad[index];
      const umed_id = aUnidad[index];

      // Se crea un objeto nuevoDetalle
      const newDetalle = {
        fac_id,
        pro_id,
        detf_monto,
        detf_cantidad,
        umed_id
      }

      // Se inserta cada uno a la BD 
      await pool.query('INSERT INTO detalle_factura SET ?', [newDetalle]);

    }
  }
  // Si el tipo de comprobante es Boleta 
  else if (tipo_cmp == 2) {

    // Se busca el id de la persona natural 
    let pe_nat_id = (await pool.query('SELECT pe_nat_id FROM persona_natural WHERE pe_nat_dni = ?', [req.body.documentox]))[0].pe_nat_id;
    
    //Se guarda la fecha de la boleta
    let bol_fecha = req.body.bol_fecha;

    //Se guarda el id del modo de pago
    let mod_id = (await pool.query('SELECT mod_id FROM modo_pago WHERE mod_nombre = ?', [req.body.modopago]))[0].mod_id;
    
    //Se guarda el tipo de moneda
    let bol_tipo_moneda = req.body.bol_tipo_moneda;

    //Se guardan los arreglos de las cantidades, unidad, descrpicion, monto
    let aCantidad = req.body.cantidad;
    let aUnidad = req.body.unidad;
    let aDescripcion = req.body.descripcion;
    let aMonto = req.body.monto;

    // Se guardan el monto total
    let bol_mtotal = req.body.bol_mtotal;

    // Se crea el objeto Boleta
    const boleta = {
      bol_fecha,
      bol_mtotal,
      bol_tipo_moneda,
      pe_nat_id,
      mod_id
    }

    // Se inserta la vboleta en la BD
    await pool.query('INSERT INTO boleta SET ?', [boleta]);

    // Se obtiene el objeto de la cantidad de elementos de arreglos
    let tam = Object.keys(aCantidad).length;

    // Se obtiene el id de la boleta añadida
    let bol_id = (await pool.query('SELECT bol_id FROM boleta ORDER BY bol_id DESC LIMIT 1'))[0].bol_id;

    // Se obtiene los datos del detalle a agregar
    for (let index = 0; index < tam; index++) {
      const pro_id = aDescripcion[index].split(',')[0];
      const detb_monto = aMonto[index];
      const detb_cantidad = aCantidad[index];
      const umed_id = aUnidad[index];
    
      // Se crea el objeto nuevoDetalle
      const newDetalle = {
        bol_id,
        pro_id,
        detb_monto,
        detb_cantidad,
        umed_id
      }

      // Se inserta los detalles en la BD
      await pool.query('INSERT INTO detalle_boleta SET ?', [newDetalle]);

    }
  } else {

  }

  // Mostrar la vista dashboard
  res.redirect('/dashboard/');
});



router.post('/boleta', async (req, res) => {

  // Se obtiene el documento del formulario
  const {
    documentox
  } = req.body;

  // Se obtienen los datos de la persona natural
  const dat = await pool.query('SELECT pe_nat_id, pe_nat_nombres, pe_nat_apellidos, pe_nat_dni, pe_nat_direccion FROM persona_natural WHERE pe_nat_dni = ?', [documentox]);

  // Se almacenan los datos en variables
  let id = dat[0].pe_nat_id;
  let nombres = dat[0].pe_nat_nombres;
  let apellidos = dat[0].pe_nat_apellidos;
  let dni = dat[0].pe_nat_dni;
  let direccion = dat[0].pe_nat_direccion;

  // Se crea el objeto nuevoBoleta
  const newBoleta = {
    id,
    nombres,
    apellidos,
    dni,
    direccion
  }

  // Se obtiene los modos de pago
  const modo_pago = await pool.query('SELECT * FROM modo_pago');
  
  // Se obtienen los productos
  const productos = await pool.query('SELECT pro_id, pro_nombre, pro_stock, pro_precio FROM producto');
  
  // Se obtienen la unidad de medida
  const unidad_medida = await pool.query('SELECT * FROM unidad_medida');

  // Se muestra la vista boleta y se envian los objetos
  res.render('dashboard/boleta', {
    modo_pago,
    productos,
    newBoleta,
    unidad_medida
  });

});

module.exports = router;
