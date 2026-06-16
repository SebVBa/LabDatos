export function calcularCobro(req,res){
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
}