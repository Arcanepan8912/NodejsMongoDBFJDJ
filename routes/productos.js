//LLama a express para poder usar los controladoras para poder usarlos en Postman
const express = require('express');
const router = express.Router();

const ControladorProductos = require('../controlador/op_productos.js');

router.get('/', ControladorProductos.listaProductos);

router.get('/:id', ControladorProductos.listaPorIdProducto);

router.post('/', ControladorProductos.creaProducto);

router.put('/:id', ControladorProductos.actualizaProducto);

router.delete('/:id', ControladorProductos.eliminaProducto);

module.exports = router;