import pooldb from '../../config/db.js';

export async function verificarUsuario(req,res){
    try{ 
    const {nombre,correo,contrasena,confirmacion}=req.body;

    if (!nombre || nombre.trim()=="") {
     return res.status(400).json({error:"El nombre es obligatorio"})
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo || !regexCorreo.test(correo)) {
    return res.status(400).json({error: "El correo electrónico no es válido"});
    }

    const regexContrasena =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!contrasena || !regexContrasena.test(contrasena)) {
    return res.status(400).json({error: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número"});
    }

    if (contrasena !== confirmacion) {
    return res.status(400).json({error: "Las contraseñas no coinciden"});
    }

    const [result] = await pooldb.execute(
      `INSERT INTO usuarios
      (nombre, correo, contrasena)
      VALUES (?, ?, ?)`,
      [
        nombre,
        correo,
        contrasena
      ]
    );

    res.json ({
        id: result.insertId,
    nombre: nombre,
    correo: correo,
    mensaje:"Usuario registrado correctamente"
    });

    }catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
   }

   
   }