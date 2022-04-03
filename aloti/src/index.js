
const express = require('express');
const app= express(); 
const token = require('./routers/token');
const cors = require('cors');
// middleware
app.use(express.json());
app.use(cors());

// router
app.use(require('./routers/categorias'));
app.use(require('./routers/productos'));
app.use(require('./routers/usuarios'));
app.use(token.validarToken);





app.listen(8080,()=>{
    console.log("Corriendo puerto 8080");
})




// conexion.end();

