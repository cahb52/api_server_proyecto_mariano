const configApp = require('../config/config');
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const { Pool } = require('pg')
const usuario = require('../models/usuarios');
const roles = require('../models/roles.js');
const { Sequelize } = require('../config/database');
const Op = Sequelize.Op;

const login = async (req,res)=>{
    //console.log(req.body);
    var POST =  {};
    try {
        if (req.method == 'POST') {
            POST = req.body
            console.log(POST.password);
        if(POST.username=="" || POST.username==undefined)
        {
            res.sendStatus(500);
        }
        else if(POST.password=="" || POST.password==undefined)
        {
            res.sendStatus(500);
        }
        else{
            const usuarios = await usuario.findOne({
                include: [{
                model: roles,
                required:true,
                on:{
                    id_rol: {
                        [Op.col]:'usuario.id_rol'
                    }
                },
            }],
            where: {
                users: POST.username,
                password: POST.password
            }
            });
            //console.log(usuarios);
            if(usuarios === null) {
                res.status(200).json({
                    message:"error",
                    type:"usuario_no_encontrado"
                });
            } else {
                const user = {
                    id:usuarios.id_users,
                    nombre:POST.username,
                    rol:usuarios.role.rol
                    }
                    console.log(user);

                    jwt.sign({user},configApp.Main.TokenKey,{expiresIn:'24h'},(err,token)=>{
                            
                            res.status(200).json({
                                token: token,
                                ok: true,
                            });
                                               
                        });

            }
            //console.log(usuarios);
          }
    }
    } catch (error ){
        res.status(200).json({
            message:"error",
            type:"error en la consulta"
        });
    }

}
const verificarToken = (req,res) => {
    
    const resultado = jwt.verify(req.body.token,configApp.Main.TokenKey);
    if(resultado.user.rol){
        res.status(200).json({
            message: "ok",
            rol: resultado.user.rol,
            type:"exito"
        }        
        );
    } else {
        res.status(200).json({
            message:"error",
            type:"no valido"
        })
    }
}
module.exports = {
    login,
    verificarToken
};