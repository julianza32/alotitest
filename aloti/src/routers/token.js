function validarToken(req, res, next) {
    const headerClient = req.headers['tokenclient'];
    if (typeof headerClient !== 'undefined') {
         let token = headerClient.split(" ");
         req.token = token[0];
         next();
    } else {
        res.sendStatus(403)
    }
}
module.exports = {
    "validarToken": validarToken

} 
