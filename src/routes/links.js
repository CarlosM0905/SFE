// 2:05 NOS QUEDAMOS EN EL VIDEO 
// ATTE CARLOS DEL PASADO :v

const express = require('express');

const router = express.Router();

// POOL = DATABASE OBJECT
// Se importa el objeto database
const pool = require('../database');

// Si se accede a la ruta ../add 
router.get('/add', (req, res)=>{
    res.render('links/add');
});



// Recibe los datos del formulario
// async necesario para que la operacion se realice a la par

// Guardar datos

router.post('/add', async (req,res)=>{
    const {title, url, description} = req.body;

    const newLink = {
        title,
        url,
        description
    };

    // Enviar la query  --> await necesario por la demora del servidor
    await pool.query('INSERT INTO links set ?',[newLink]);

    // Mensaje de añadido
    req.flash('success','Link saved successfully');

    // Redirect redirige a una ruta especifica
    res.redirect('/links');
});

// Retorna los datos almacenados en la tabla links
// Si la ruta es /links entra a esta funcion
router.get('/', async(req,res)=>{
    const links = await pool.query('SELECT * FROM links');
    res.render('links/list', {links});
});
// Eliminar

router.get('/delete/:id', async (req,res)=>{
    // Request params tiene todos los parametros que pasa el usuario en la peticion
    // Selecciono solo el id
    const {id} = req.params;
    // Hago la consulta
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Link remove successfully');
    res.redirect('/links');
});


// Editar 
router.get('/edit/:id', async (req,res)=>{
    const {id} = req.params;
    const link = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit', {link:link[0]} );
});

// Respuesta del Editar

router.post('/edit/:id',  async(req,res)=>{
    const {id} = req.params;
    const {title, description, url} = req.body;

    const newLink = {
        title,
        description,
        url
    };

 
    await pool.query('UPDATE links SET ? WHERE id = ?' , [newLink,id]);
    req.flash('success', 'Link Updated Successfully');
    res.redirect('/links');
    

});

module.exports = router;