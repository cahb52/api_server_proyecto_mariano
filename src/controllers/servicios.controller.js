const configApp = require('../config/config.js');
//const jwt = require("jsonwebtoken");
const servicio = require('../models/servicios.js');


const listarServicios = async (req,res)=>{
    //var resultado = jwt.verify(req.token,configApp.Main.TokenKey);
    try {
        var servicios = await servicio.findAll({
            order: ['id_servicio']
        });
        
        if(servicios != null){
            // console.log(servicios);
            res.status(200).send(servicios);
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
//creación de servicios via postgresql
const crearServicio = async (req,res) => {
    console.log(req.body);
    try {
        var servicios = await servicio.create({
            tipo_servicio: req.body.tipo_servicio,
            descripcion: req.body.descripcion,
            
        }, { fields: [
            'tipo_servicio',
            'descripcion',
        ] });
        // console.log(servicios);
        if(servicios.id_servicio) {
            console.log(servicios.id_servicio); 
        res.status(200).json({
            message:'ok',
            id_servicio: servicios.id_servicio
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
const verServicio = async (req,res) =>{
    try {
        var servicios = await servicio.findByPk(req.params.id,
            {
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });
        if(servicios != null){
            //console.log(servicios);
            res.status(200).json(servicios);
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

const actualizarServicio = async (req,res) => {
    try {
        const servicios = await servicio.update({
            tipo_servicio: req.body.tipo_servicio,
            descripcion: req.body.descripcion,
        },
        { 
            where: {
                id_servicio: req.params.id
            }
        });
        if(servicios == 1){
            res.status(200).json({
                message:"ok",
                type:"actualizado"
            });
        } else {
            res.status(200).json({
                message:"error",
                type:"no_actualizado"
            });
        }
        //console.log(servicios);
        //res.status(200).json(servicios);    
    } catch(error){
        console.log(error);
        res.status(200).json({
            message:'error',
            type:'error_en_consulta'
        });
    }
};

const eliminarServicio = async (req,res) => {
    try {
        const servicios = await servicio.destroy({
            where: {
                id_servicio: req.params.id
            }
        });
        if(servicios){
            console.log(servicios);
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
    listarServicios,
    crearServicio,
    verServicio,
    actualizarServicio,
    eliminarServicio

};
