const express = require('express');
const router = express.Router();
const conexion = require('../db/database');
const jwt = require('jsonwebtoken');
const token = require('./token');


router.get('/listartodascat', token.validarToken, (req, res) => {
    jwt.verify(req.token, 'llave_secreta', (err) => {
        if(err){
            res.sendStatus(403);

        }else{
            conexion.query('call sp_getAllCategoria();', (error, result) => {
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

router.post('/registrarcat', token.validarToken, (req, res) => {
    jwt.verify(req.token, 'llave_secreta', (err) => {
        if(err){
            res.sendStatus(403);

        }else{
            const { Nombre, Descripcion } = req.body;
            conexion.query('call sp_addCategoria(?,?);', [Nombre, Descripcion ], (err, result) => {
                if (err) {
                    res.status(500).send({ mensaje: "Error en el servidor" });
                } else if (!result) {
                    res.status(200).send({ mensaje: "No fue posible añadir la categoria" });
                } else {
                    res.status(200).send({ mensaje: "Categoria añadida" });
        
                }
            })
        }
    })
    
    
})
router.post('/editarcat', token.validarToken,(req,res)=>{
    jwt.verify(req.token, 'llave_secreta', (err) => {
        if(err){
            res.sendStatus(403);
        }else{
            const { IDCategoria,Nombre, Descripcion } = req.body;
            conexion.query('call sp_editCategoria(?,?,?);', [IDCategoria,Nombre, Descripcion ], (err, result) => {
                if (err) {
                    res.status(500).send({ mensaje: "Error en el servidor" });
                } else if (!result) {
                    res.status(200).send({ mensaje: "No fue posible editar la categoria" });
                } else {
                    res.status(200).send({ mensaje: "Categoria Editada" });
        
                }
            })
        }
    })
    
})
router.put('/eliminarcat',  token.validarToken,(req, res) => {

    jwt.verify(req.token, 'llave_secreta', (err) => {
        if(err){
            res.sendStatus(403);
        }else{
            const { IDCategoria } = req.body;
            conexion.query('Call sp_deleteCategoria(?);', [IDCategoria], (err, result) => {
                if (err) {
                    res.status(500).send({ mensaje: "Error en el servidor" })
                } else if (!result) {
                    res.status(200).send({mensaje: "No se pudo eliminar la categoria"})
                } else {
                    res.status(200).send({ mensaje: "Categoria eliminada" });
                }
            })    
        }
    })
        
})

module.exports = router;

