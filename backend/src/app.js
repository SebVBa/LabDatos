import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const NAME=process.env.SERVER_NAME;
const VERSION=process.env.SERVER_VERSION;
const DESCRIPTION=process.env.SERVER_DESCRIPTION;
const PORT=process.env.SERVER_PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) =>{
    res.json ({
    name: NAME,
    version: VERSION,
    description: DESCRIPTION,
    port: PORT    
    });
});

app.post(`/api/parqueo/calcular`, (req,res) =>{
const {placa, tipo, horas, minutos} = req.body;

if (!placa || placa.trim()=="") {
    res.status(400).json({error:"La placa es obligatoria"})
}
if (tipo!=="carro" && tipo!=="moto" ) {
        res.status(400).json({error:"El tipo de vehiculo debe ser carro o moto"})
    }
if (!horas) {
    res.status(400).json({error:"La hora es obligatoria"})
}else{
    if (Number.isNaN(minutos) || horas<=0 || minutos > 59) {
        res.status(400).json({error:"Las horas no deben ser negativas o no deben ser mayor a 59"})
    }
}
if (!minutos) {
    res.status(400).json({error:"Los minutos son obligatoria"})
}else{
    if (Number.isNaN(minutos) || minutos< 0 || minutos > 59 ) {
        res.status(400).json({error:"Los minutos no deben ser negativas o no deben ser mayor a 59"})
    }
}

const tarifa=tipo==="carro"? 1200 : 500 ;
 let h= Number(horas)
 let m= Number(minutos)
 if (m>5) h++;

    res.json ({
    placa: placa,
    tipo: tipo,
    tarifa: tarifa,
    tiempo: horas+":"+minutos,
    horasCobradas: h,
    minutosCobrados: m
    });
});

app.listen(4000, () =>{
 console.log(`${NAME} ejecutandose en el puerto http://localhost:${PORT}`)
});