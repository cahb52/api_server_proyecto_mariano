const configApp = require('../config/config.js');
//const jwt = require("jsonwebtoken");
const usuarios = require('../models/usuarios.js');
const personal = require('../models/personal');
const roles = require('../models/roles.js');
const {Op} = require('sequelize')
const listarPersonals = async (req,res)=>{
    try {
        var personals = await personal.findAll({
            order:['id_personal'],
            include: [{
                model: usuarios,
               required:true,
               on:{
                id_rol: {
                    [Op.col]:'usuario.id_users'
                }
            },
               attributes: { exclude: ['password'] }
            }],
          });
        //console.log(personals);
        if(personals != null){
            // console.log(usuarios);
            res.status(200).send(personals);
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
const crearPersonals = async (req,res) => {
    try {
        //console.log(req.body);
        var personals = await personal.create({
            primer_apellido: req.body.primer_apellido,
            segundo_apellido: req.body.segundo_apellido,
            primer_nombre: req.body.primer_nombre,
            segundo_nombre: req.body.segundo_nombre,
            cui: req.body.cui,
            fecha_nacimiento: req.body.fecha_nacimiento,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            id_users:req.body.id_users
        }, { fields: [
            'primer_apellido',
            'segundo_apellido',
            'primer_nombre',
            'segundo_nombre',
            'cui',
            'fecha_nacimiento',
            'direccion',
            'telefono',
            'id_users'
        ] });
        console.log(personals);
        if(personals.id_personal) {
            //console.log(personals.id_personal); 
            
        res.status(200).json({
            message:'ok',
            id_personal: personals.id_personal
        });
        } else {
            res.status(200).json({
                message:'error',
                type: 'nocreado'
            });
        }
    }catch(error){
        //console.log(error);
        res.sendStatus(404);
    }

}
const verPersonal = async (req,res) =>{
    try {
        var personals = await personal.findByPk(req.params.id);
        if(usuarios != null){
            //console.log(personals);
            res.status(200).json(personals);
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

const actualizarPersonal = async (req,res) => {
    try {
        const personals = await personal.update({
            primer_apellido: req.body.primer_apellido,
            segundo_apellido: req.body.segundo_apellido,
            primer_nombre: req.body.primer_nombre,
            segundo_nombre: req.body.segundo_nombre,
            cui: req.body.cui,
            fecha_nacimiento: req.body.fecha_nacimiento,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            id_users:req.body.id_users
        },
        { 
            where: {
                id_personal: req.params.id
            }
        });
        //console.log(personals);
        res.status(200).json({
            message:'ok',
            type:'Dato actualizado'
        });    
    } catch(error){
        //console.log(error);
        res.status(200).json({
            message:'error',
            type:'error_en_consulta'
        });
    }
};

const eliminarPersonal = async (req,res) => {
    try {
        const personals = await personal.destroy({
            where: {
                id_personal: req.params.id
            }
        });
        if(personals){
            console.log(personals);
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
    listarPersonals,
    crearPersonals,
    verPersonal,
    actualizarPersonal,
    eliminarPersonal

};