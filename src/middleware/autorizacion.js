const configApp = require('../config/config');
const jwt = require("jsonwebtoken");


function verifyToken(req,res,next)
{
    const bearerHeader = req.headers['authorization'];
    try {
        if(typeof bearerHeader !== ' undefined')
        {
            const bearerToken = bearerHeader.split(" ")[1];
            req.token = bearerToken;
            next();
        }
        else{
            res.sendStatus(403);
        }
    } catch (error) {
        res.sendStatus(403);
    }
   
}
function isAdmin(req,res,next){
    const bearerHeader = req.headers['authorization'];
    
    try {
        if(typeof bearerHeader !== ' undefined'){
            const bearerToken = bearerHeader.split(" ")[1];
            req.token = bearerToken;
            const  resultado = jwt.verify(req.token,configApp.Main.TokenKey);
            if(resultado.user.rol === 'admin') {
                req.rol = resultado.user.rol;
            next();
            } else {
                res.sendStatus(403);
            }
            
        }
        else{
            res.sendStatus(403);
        }
    } catch (error) {
        res.sendStatus(403);
    }
}
function isTecnico(req,res,next){
    const bearerHeader = req.headers['authorization'];
    
    try {
        if(typeof bearerHeader !== ' undefined'){
            const bearerToken = bearerHeader.split(" ")[1];
            req.token = bearerToken;
            const  resultado = jwt.verify(req.token,configApp.Main.TokenKey);
            if(resultado.user.rol === 'supervisor' || resultado.user.rol === "tecnico" || resultado.user.rol === "admin") {
                req.rol = resultado.user.rol;
            next();
            } else {
                res.sendStatus(403);
            }
            
        }
        else{
            res.sendStatus(403);
        }
    } catch (error) {
        res.sendStatus(403);
    }
}
function isSupervisor(req,res,next){
    const bearerHeader = req.headers['authorization'];
    
    try {
        if(typeof bearerHeader !== ' undefined'){
            const bearerToken = bearerHeader.split(" ")[1];
            req.token = bearerToken;
            const  resultado = jwt.verify(req.token,configApp.Main.TokenKey);
            if(resultado.user.rol === 'supervisor' || resultado.user.rol === "admin") {
                req.rol = resultado.user.rol;
            next();
            } else {
                res.sendStatus(403);
            }
            
        }
        else{
            res.sendStatus(403);
        }
    } catch (error) {
        res.sendStatus(403);
    }
}

module.exports = {
    verifyToken,
    isAdmin,
    isSupervisor,
    isTecnico
}