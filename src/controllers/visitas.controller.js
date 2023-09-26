const configApp = require('../config/config.js');
//const jwt = require("jsonwebtoken");
const visita = require('../models/visitas.js');
const clientes = require('../models/clientes');
const servicio = require('../models/servicios');
const personal = require('../models/personal');
const { Sequelize} = require('../config/database.js');
const db  = require('../config/rawQuerys.js');
const { QueryTypes } = require('sequelize');



const Op = Sequelize.Op;
const nodemailer = require("nodemailer");
const visitas = require('../models/visitas.js');

const transporter = nodemailer.createTransport({
  host: "mail.quetzalgt.com",
  port: 465,
  secure: true,
  auth: {
    //reemplazar valores con los necesarios en su servidor
    user: "test@quetzalgt.com",
    pass: "jTz5tkzt+aLK",
  },
});


const enviarEmail = async (idvisita) =>{
    try {
   // const resultadosvisita =  db.query("select clientes.correo as correo, visitas.hora_visita as hora, visitas.fecha as fecha from visitas inner join clientes on visitas.id_cliente = clientes.id_cliente where visitas.id_visita = "+idvisita, { type: QueryTypes.SELECT })
   const resultadosvisita = await visitas.findAll({
    where:{
        id_visita: idvisita
    },
    include: [{all:true, nested:true},{
       model:clientes,
       required:true,
       on: {
        id_cliente: {
            [Op.col]:'visitas.id_cliente'
        }
       }
    }]
   });

 let datocorreo = ''
 let  hora = ''
 let fecha = ''
resultadosvisita.map((dato,i)=>{
    datocorreo+=dato.cliente.correo;
    hora+=dato.hora
    fecha+=dato.fecha
}) 
console.log(datocorreo)  
   let datos = "Hola!, su visita ha sido agendada con éxito en la fecha "+ fecha+" a las "+hora+", por favor espere a que el técnico le visite!, Gracias"
    const info = await transporter.sendMail({
    from: 'test@quetzalgt.com', // sender address
    to: datocorreo, // list of receivers
    subject: "Su visita fue agendada con éxito", // Subject line
    text: datos, // plain text body
    html: "<b>"+datos+"</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  //Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
} catch(Error) {
    console.log(Error)
}


}

const listarVisitas = async (req,res)=>{
    //var resultado = jwt.verify(req.token,configApp.Main.TokenKey);
    try {
        var visitas = await visita.findAll({
            include: [{all: true, nested:true},{
                model: clientes,
               required:true,
               on:{
                id_cliente: {
                    [Op.col]:'visitas.id_cliente'
                }
                },
            },{
                
                model: servicio,
               required:true,
               on:{
                id_servicio: {
                    [Op.col]:'visitas.id_servicio'
                }
                },
            },{
                model: personal,
               required:true,
               on:{
                id_personal: {
                    [Op.col]:'visitas.id_personal'
                }
                },
               
            }],
        });
        console.log(visitas);
        if(visitas != null){
            // console.log(servicios);
            res.status(200).send(visitas);
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
const crearVisita = async (req,res) => {
    console.log(req.body)
    try {
        var visitas = await visita.create({
            id_cliente: req.body.id_cliente,
            id_servicio: req.body.id_servicio,
            id_personal: req.body.id_personal,
            fecha: req.body.fecha,
            hora_visita: req.body.hora_visita,
            estado: req.body.estado,
            observaciones: req.body.observaciones
        }, { fields: [
            'id_cliente',
            'id_servicio',
            'id_personal',
            'fecha',
            'hora_visita',
            'estado',
            'observaciones',
        ] });
        // console.log(visitas);
        if(visitas.id_visita) {

            console.log(visitas.id_visita); 
            await enviarEmail(visitas.id_visita)
        res.status(200).json({
            message:'ok',
            id_visita: visitas.id_visita,
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

const verVisita = async (req,res) =>{
    try {
        var visitas = await visita.findOne({
            include: [{all: true, nested:true},{
                model: clientes,
               required:true,
               on:{
                id_cliente: {
                    [Op.col]:'visitas.id_cliente'
                }
                },
            },{
                model: servicio,
               required:true,
               on:{
                id_servicio: {
                    [Op.col]:'visitas.id_servicio'
                }
                },
            },{
                model: personal,
               required:true,
               on:{
                id_personal: {
                    [Op.col]:'visitas.id_personal'
                }
                },
               
            }],
            where: {id_visita:req.params.id}
        });
        if(visitas != null){
            //console.log(servicios);
            res.status(200).json(visitas);
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

const actualizarVisita = async (req,res) => {
    try {
        const visitas = await visita.update({
            id_cliente: req.body.id_cliente,
            id_servicio: req.body.id_servicio,
            id_personal: req.body.id_personal,
            fecha: req.body.fecha,
            hora_visita: req.body.hora_visita,
            estado: req.body.estado,
            observaciones: req.body.observaciones
        },
        { 
            where: {
                id_visita: req.params.id
            }
        });
        if(visitas == 1){
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
        //console.log(visitas);
        //res.status(200).json(visitas);    
    } catch(error){
        console.log(error);
        res.status(200).json({
            message:'error',
            type:'error_en_consulta'
        });
    }
};

const eliminarVisita = async (req,res) => {
    try {
        const visitas = await visita.destroy({
            where: {
                id_visita: req.params.id
            }
        });
        if(visitas){
            console.log(visitas);
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
    listarVisitas,
    crearVisita,
    verVisita,
    actualizarVisita,
    eliminarVisita

};
