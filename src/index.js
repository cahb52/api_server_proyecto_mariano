const express = require("express");
var cors = require("cors");

const app = express();

var CorsOptions = {
    //origin:"http://localhost:3000"
    origin:'*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
};
app.use(cors(CorsOptions));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(require('./routes/routes'));

app.get('/', (req, res)=>{
res.json({message:"bienvenido a la api"});
});
app.listen(3000,()=>{
    console.log("el servidor esta corriendo en el puerto 3000");
});
