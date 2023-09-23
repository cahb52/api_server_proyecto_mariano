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
            res.status(200).json({
                message: "errorauth",
                type:"Usted no esta autorizado"
            });
        }
    } catch (error) {
        res.status(200).json({
            message: "errorauth",
            type:"Usted no esta autorizado"
        });
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
                res.status(200).json({
                    message: "errorauth",
                    type:"Usted no esta autorizado"
                });
            }
            
        }
        else{
            res.status(200).json({
                message: "errorauth",
                type:"Usted no esta autorizado"
            });
        }
    } catch (error) {
        res.status(200).json({
            message: "errorauth",
            type:"Usted no esta autorizado"
        });
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
                res.status(200).json({
                    message: "errorauth",
                    type:"Usted no esta autorizado"
                });
            }
            
        }
        else{
            res.status(200).json({
                message: "errorauth",
                type:"Usted no esta autorizado"
            });
        }
    } catch (error) {
        res.status(200).json({
            message: "errorauth",
            type:"Usted no esta autorizado"
        });
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
                res.status(200).json({
                    message: "errorauth",
                    type:"Usted no esta autorizado"
                });
            }
            
        }
        else{
            res.status(200).json({
                message: "errorauth",
                type:"Usted no esta autorizado"
            });
        }
    } catch (error) {
        res.status(200).json({
            message: "errorauth",
            type:"Usted no esta autorizado"
        });
    }
}

module.exports = {
    verifyToken,
    isAdmin,
    isSupervisor,
    isTecnico
}