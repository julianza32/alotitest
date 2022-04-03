const express = require('express');
const router = express.Router();
const conexion = require('../db/database');
const token = require('./token');
const jwt = require('jsonwebtoken');

router.get('/listartodosusuario', token.validarToken, (req, res) => {

    jwt.verify(req.token, 'llave_secreta', (err) => {
        if (err) {
            res.sendStatus(403);
        } else {
            conexion.query('call sp_getAllUser();', (error, result) => {
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

router.post('/registrarusuario',  token.validarToken,(req, res) => {
    jwt.verify(req.token, 'llave_secreta', (err) => {
    
    if(err){
        res.sendStatus(403);
    }else{
        const { Nombres, Apellidos, Correo, Contrasena } = req.body;
        conexion.query('call sp_addUsuario(?,?,?,?);', [Nombres, Apellidos, Correo, Contrasena], (err, result) => {
            if (err) {
                res.status(500).send({ mensaje: "Error en el servidor" });
            } else if (!result) {
                res.status(200).send({ mensaje: "No fue posible añadir el usuario" });
            } else {
                res.status(200).send({ mensaje: "Usuario añadido" });
            }
        })
    }
    })
})

router.put('/eliminarusuario',  token.validarToken,(req, res) => {
    jwt.verify(req.token, 'llave_secreta', (err) => {
    
    if(err){
        res.sendStatus(403);
    }else{
        const { IDUsuario } = req.body;
        conexion.query('Call sp_deleteUsuario(?);', [IDUsuario], (err, result) => {
            if (err) {
                res.status(500).send({ mensaje: "Error en el servidor" })
            } else if (!result) {
                res.status(200).send({ mensaje: "No se pudo eliminar el usuario" })
            } else {
                res.status(200).send({ mensaje: "Usuario eliminado" });
            }
        })
    }
    })
})
router.post('/editarusuario',token.validarToken, (req, res) => {

    jwt.verify(req.token, 'llave_secreta', (err) => {
    
        if(err){
            res.sendStatus(403);
        }else{
            const { IDUsuario, Nombres, Apellidos, Correo, Contrasena } = req.body;
            conexion.query('call sp_editUsuario(?,?,?,?,?);', [IDUsuario, Nombres, Apellidos, Correo, Contrasena], (err, result) => {
                if (err) {
                    res.status(500).send({ mensaje: "Error en el servidor" });
                } else if (!result) {
                    res.status(200).send({ mensaje: "No fue posible editar el usuario" });
                } else {
                    res.status(200).send({ mensaje: "Usuario Editado" });
                }
            })
        }
    })
  
})

router.post('/login', (req, res) => {
    const { Correo, Contrasena } = req.body;
    conexion.query('call sp_login(?,?);', [Correo, Contrasena], (err, result) => {
        if (err) {
            res.status(500).send({ mensaje: "Error en el servidor" });
        } else if (!result) {
            res.status(200).send({ mensaje: "No fue hacer el login" });
        } else if (result[0].length>0) {
            const user = result[0];
            const token = jwt.sign({ user }, 'llave_secreta')
            res.json({ user, token });
        } else {
            res.status(200).send({ mensaje: "Correo o contraseña incorrecta" });

        }
    })

})

module.exports = router;

