import pooldb from '../../config/db.js';
import bcrypt from 'bcrypt';

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
        await bcrypt.hash(contrasena,10)
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

   export async function obtenerUsuarios(req, res) {
  try {
    const [rows] = await pooldb.execute(
      "SELECT id, nombre, correo FROM usuarios"
    );

    res.json(rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

export async function obtenerUsuarioPorId(req, res) {
  try {
    const { id } = req.params;

    const [rows] = await pooldb.execute(
      "SELECT id, nombre, correo FROM usuarios WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

export async function actualizarUsuario(req, res) {
  try {
    const { id } = req.params;
    const { nombre, correo } = req.body;

    if (!nombre || !correo) {
      return res.status(400).json({ error: "Nombre y correo son obligatorios" });
    }

    const [result] = await pooldb.execute(
      `UPDATE usuarios 
       SET nombre = ?, correo = ? 
       WHERE id = ?`,
      [nombre, correo, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({
      mensaje: "Usuario actualizado correctamente"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

export async function eliminarUsuario(req, res) {
  try {
    const { id } = req.params;

    const [result] = await pooldb.execute(
      "DELETE FROM usuarios WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({
      mensaje: "Usuario eliminado correctamente"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

export async function autenticar(req,res){
try {
    const {correo, contrasena} = req.body;

    const[result]= await pool.execute(
        `select correo,contrasena from usuario where correo=?`
        ,[correo]
    );

    if (result.length===0 ||
        !await bcrypt.compare(contrasena, result[0].contrasena)) 
        return res.status(404).json({ mensaje: "Correo y/o contraseña incorrectos" })

    return res.json(
        {
          correo: correo,
          mensaje: "acceso autorizado"
    });

} catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
}
}