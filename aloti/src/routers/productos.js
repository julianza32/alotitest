const express = require('express');
const router = express.Router();
const conexion = require('../db/database');
const token = require('./token');
const jwt = require('jsonwebtoken');



router.get('/listartodosprod', token.validarToken, (req, res) => {
    jwt.verify(req.token, 'llave_secreta', (err) => {
        if (err) {
            res.sendStatus(403);
        } else {
            conexion.query('call sp_getAllProductos();', (error, result) => {
                if (error) {
                    res.status(500).send({ mensaje: "Error en el servidor" });
                } else if (!result) {
                    res.status(200).send({ mensaje: "No fue posible listar" });
                }
                else {
                    res.status(200).send(result[0]);
                }
            })
        }
    })

})

router.post('/registrarprod', token.validarToken, (req, res) => {
    jwt.verify(req.token, 'llave_secreta', (err) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const { Nombre, Valor, IDCategoria } = req.body;
            conexion.query('call sp_addProducto(?,?,?);', [Nombre, Valor, IDCategoria], (err, result) => {
                if (err) {
                    res.status(500).send({ mensaje: "Error en el servidor" });
                } else if (!result) {
                    res.status(200).send({ mensaje: "No fue posible añadir el producto" });
                } else {
                    res.status(200).send({ mensaje: "Producto añadido" });
                }
            })
        }
    })

})

router.put('/eliminarprod', token.validarToken, (req, res) => {
    jwt.verify(req.token, 'llave_secreta', (err) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const { IDProducto } = req.body;
            conexion.query('Call sp_deleteProducto(?);', [IDProducto], (err, result) => {
                if (err) {
                    res.status(500).send({ mensaje: "Error en el servidor" })
                } else if (!result) {
                    res.status(200).send({ mensaje: "No se pudo eliminar el producto" })
                } else {
                    res.status(200).send({ mensaje: "Producto eliminado" });
                }
            })
        }
    })
})
router.post('/editarprod', token.validarToken, (req, res) => {
    jwt.verify(req.token, 'llave_secreta', (err) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const { IDProducto, Nombre, Valor, IDCategoria } = req.body;
            conexion.query('call sp_editProducto(?,?,?,?);', [IDProducto, Nombre, Valor, IDCategoria], (err, result) => {
                if (err) {
                    res.status(500).send({ mensaje: "Error en el servidor" });
                } else if (!result) {
                    res.status(200).send({ mensaje: "No fue posible editar el producto" });
                } else {
                    res.status(200).send({ mensaje: "Producto Editado" });
                }
            })
        }
    })
})

module.exports = router;

