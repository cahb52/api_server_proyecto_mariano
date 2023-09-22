const configApp = require('../config/config.js');
//const jwt = require("jsonwebtoken");
const cliente = require('../models/clientes.js');

const listarClientes = async (req,res)=>{
    //var resultado = jwt.verify(req.token,configApp.Main.TokenKey);
    try {
        var clientes = await cliente.findAll();
        
        if(clientes != null){
            // console.log(clientes);
            res.status(200).send(clientes);
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
//creación de clientes via postgresql
const crearClientes = async (req,res) => {
    try {
        var clientes = await cliente.create({
            primer_apellido: req.body.primer_apellido,
            segundo_apellido: req.body.segundo_apellido,
            primer_nombre: req.body.primer_nombre,
            segundo_nombre: req.body.segundo_nombre,
            entidad: req.body.entidad,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            nit: req.body.nit,
            correo: req.body.correo,
            latitud: req.body.latitud,
            longitud: req.body.longitud
        }, { fields: [
            'primer_apellido',
            'segundo_apellido',
            'primer_nombre',
            'segundo_nombre', 
            'entidad',
            'direccion',
            'telefono',
            'nit',
            'correo',
            'latitud',
            'longitud',

        ] });
        // console.log(clientes);
        if(clientes.id_cliente) {
            console.log(clientes.id_cliente); 
        res.status(200).json({
            message:'ok',
            id_cliente: clientes.id_cliente
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
const verCliente = async (req,res) =>{
    try {
        var clientes = await cliente.findByPk(req.params.id);
        if(clientes != null){
            //console.log(clientes);
            res.status(200).json(clientes);
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

const actualizarCliente = async (req,res) => {
    try {
        const clientes = await cliente.update({
          primer_apellido: req.body.primer_apellido,
          segundo_apellido: req.body.segundo_apellido,
          primer_nombre: req.body.primer_nombre,
          segundo_nombre: req.body.segundo_nombre,
          entidad: req.body.entidad,
          direccion: req.body.direccion,
          telefono: req.body.telefono,
          nit: req.body.nit,
          correo: req.body.correo,
          latitud: req.body.latitud,
          longitud: req.body.longitud
        },
        { 
            where: {
                id_cliente: req.params.id
            }
        });
        if(clientes==1){
            res.status(200).json({
                message:"ok",
                type:"actualizado"
            });
        } else {
            res.status(200).json({
                message:"error",
                type:"no actualizado"
            });
        }
            
    } catch(error){
        console.log(error);
        res.status(200).json({
            message:'error',
            type:'error_en_consulta'
        });
    }
};

const eliminarCliente = async (req,res) => {
    try {
        const clientes = await cliente.destroy({
            where: {
                id_cliente: req.params.id
            }
        });
        if(clientes){
            console.log(clientes);
            res.status(200).json({
                message:'ok',
                type:'eliminado'
            });
        } else {
            res.status(200).json({
                message:'error',
                type:'Hubo un error al eliminar, intentelo de nuevorecargando el navegador o eligiendo otro dato a eliminar, Recuerde que un cliente con historial de visitas no puede ser eliminado'
            });
        }
    } catch (err){
        res.status(200).json({
            message:'error',
            type:'Hubo un error al eliminar, intentelo de nuevorecargando el navegador o eligiendo otro dato a eliminar, Recuerde que un cliente con historial de visitas no puede ser eliminado'
        });
    }
};

module.exports = {
    listarClientes,
    crearClientes,
    verCliente,
    actualizarCliente,
    eliminarCliente

};
