const mongodb = require('../bd/conexion.js');
const ObjectId = require('mongodb').ObjectId;

//Función que listará todos los Productos existentes en la BD y los retornará en un JSON
const listaProductos = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('Producto').find();
    console.log('Trayendo Productos');
    console.log(result);
    result.toArray().then((productos) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(productos);
    });
};
//Función para llamar todos los Productos en la BD
const listaPorIdProducto = async (req, res, next) => {
    const prodId = parseInt(req.params.id);
    console.log('ID',prodId);
    const result = await mongodb.getDb().db().collection('Producto').find({ id: prodId });
    console.log('Trayendo Producto');

    result.toArray().then((productos) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(productos[0]);
    });
};
//Función para crear todos los Productos que se nombren en la BD
const creaProducto = async (req, res, next) => {
    const datosProducto = {
        id:req.body.id,
        Nombre:req.body.Nombre,
        descripcion:req.body.descripcion,
        precio:req.body.precio
     };

    const response = await mongodb.getDb().db().collection('Producto').insertOne(datosProducto);

    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Error al crear el Nuevo Producto.');
    }
};
//Función para actualizar todos los Productos que se nombren en la BD por su ID
const actualizaProducto = async (req, res, next) => {
    const prodId = parseInt(req.params.id);

    const datosProducto = {
        id:req.body.id,
        Nombre:req.body.Nombre,
        descripcion:req.body.descripcion,
        precio:req.body.precio
    };

    const response = await mongodb.getDb().db().collection('Producto').replaceOne({ id: prodId }, datosProducto);
    
    if (response.modifiedCount > 0) {
        res.status(200).json(response);
    } else {
        res.status(500).json(response.error || 'Error al Actualizar el Producto');
    }
};
//Función para eliminar todos los Productos que se nombren en la BD por su ID
const eliminaProducto = async (req, res, next) => {
    const prodId = parseInt(req.params.id);

    const response = await mongodb.getDb().db().collection('Producto').remove({ id: prodId }, true);

    if (response.deletedCount > 0) {
        res.status(200).json(response);
    } else {
        res.status(500).json(response.error || 'Error al Eliminar Contacto');
    }
};

module.exports = { listaProductos, listaPorIdProducto, creaProducto, actualizaProducto, eliminaProducto };