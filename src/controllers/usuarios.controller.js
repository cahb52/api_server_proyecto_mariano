const configApp = require('../config/config.js');
//const jwt = require("jsonwebtoken");
const usuario = require('../models/usuarios.js');
const { Op } = require('sequelize')
const roles = require('../models/roles.js');


const listarUsuarios = async (req,res)=>{
    //var resultado = jwt.verify(req.token,configApp.Main.TokenKey);
    try {
        var usuarios = await usuario.findAll({
            
            order:['id_users'],
            include: [{all:true, nested:true},
            //     {
            // model: roles,
            //    required:true,
            //    attributes: {
            //     exclude: ['createdAt', 'updatedAt']
            //    }
            // }
        ],
            attributes: { 
                exclude: ['password']
             }
          });
        //console.log(usuarios);
        if(usuarios != null){
            // console.log(usuarios);
            res.status(200).send(usuarios);
        } else {
            res.status(200).json({
            message:'error',
            type:'noencontrado'
        });
        }
        
    } catch(Error){
        res.status(200).json({
            message:'error',
            type:'error_en_consulta'
        });
    }
    

}
//creación de usuarios via postgresql
const crearUsuarios = async (req,res) => {
    try {
        var usuarios = await usuario.create({
            id_rol: req.body.id_rol,
            users: req.body.users,
            estado: req.body.estado,
            password: req.body.password
        }, { fields: [
            'id_rol',
            'users',
            'estado',
            'password'
        ] });
        // console.log(usuarios);
        if(usuarios.id_users) {
            console.log(usuarios.id_users); 
            
        res.status(200).json({
            message:'ok',
            id_users: usuarios.id_users
        });
        } else {
            res.status(200).json({
                message:'error',
                type: 'nocreado'
            });
        }
    }catch(error){
        console.log(error);
        res.sendStatus(404);
    }

}
const verUsuario = async (req,res) =>{
    try {
        var usuarios = await usuario.findByPk(req.params.id,{
            include: [{
                model: roles,
               required:true,
               on:{
                id_rol: {
                    [Op.col]:'role.id_rol'
                }
            },
               attributes: {
                exclude: ['createdAt', 'updatedAt']
               }
            }],
            attributes: { exclude: ['password'] }
          });
        if(usuarios != null){
            //console.log(usuarios);
            res.status(200).json(usuarios);
        } else {
            res.status(200).json({
                message:'error',
                type:'noencontrado'
            });
        }
        
    } catch(error){
        console.log(error);
        res.status(200).json({
            message:'error',
            type:'error_en_consulta'
        });
    }
}

const verUsuarioAdmin = async (req,res) =>{
    try {
        var usuarios = await usuario.findByPk(req.params.id,{
            include: [{
                model: roles,
               required:true,
               on:{
                id_rol: {
                    [Op.col]:'role.id_rol'
                }
            },
               attributes: {
                exclude: ['createdAt', 'updatedAt']
               }
            }],
          });
        if(usuarios != null){
            //console.log(usuarios);
            res.status(200).json(usuarios);
        } else {
            res.status(200).json({
                message:'error',
                type:'noencontrado'
            });
        }
        
    } catch(error){
        console.log(error);
        res.status(200).json({
            message:'error',
            type:'error_en_consulta'
        });
    }
}



const actualizarUsuario = async (req,res) => {
    try {
        const usuarios = await usuario.update({
            id_rol: req.body.id_rol,
            users: req.body.users,
            estado: req.body.estado,
            password: req.body.password
        },
        { 
            where: {
                id_users: req.params.id
            }
        });
        console.log(usuarios);
        res.status(200).json({
            message:'ok',
            type:'Dato Actualizado'
        });    
    } catch(error){
        console.log(error);
        res.status(200).json({
            message:'error',
            type:'error_en_consulta'
        });
    }
};

const eliminarUsuario = async (req,res) => {
    try {
        const usuarios = await usuario.destroy({
            where: {
                id_users: req.params.id
            }
        });
        if(usuarios){
            console.log(usuarios);
            res.status(200).json({
                message:'ok',
                type:'eliminado'
            });
        } else {
            res.status(200).json({
                message:'error',
                type:'error_en_consulta'
            });
        }
    } catch (err){
        res.status(200).json({
            message:'error',
            type:'error_en_consulta'
        });
    }
};

module.exports = {
    listarUsuarios,
    crearUsuarios,
    verUsuario,
    actualizarUsuario,
    eliminarUsuario,
    verUsuarioAdmin

};