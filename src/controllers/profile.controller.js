const configApp = require('../config/config');
const jwt = require("jsonwebtoken");
const { Pool } = require('pg')

const pool = new Pool({
    host: configApp.Database.host,
    user: configApp.Database.user,
    password: configApp.Database.password,
    database: configApp.Database.database,
    port: configApp.Database.port,
})



const profile = async (req,res)=>{
    
     jwt.verify(req.token,configApp.Main.TokenKey,async (error , authData)=>{
        if(error)
        {
            res.sendStatus(403);
        }
        else{
            
                let query = await pool.query("select * from profile where id_usuario ='" +req.body.UserId +"'");
                if(query.rows[0]==null)
                {
                    res.status(500).json({error: 'Ha Ocurrido un error'});
                }
                else{
                   
                        data = {
                          "NombrePerfil":query[0].ProfileName,
                          
                        }
                        res.status(200).json({
                            data:data,
                            ok: true,
                        })
                    }  
        } 
    })
}
module.exports = {
    profile
}