import { Router } from "express";
import { verificarUsuario } from "../controller/usuario.controller.js";

const router = Router();

router.post(`/verificarUsuario`, verificarUsuario);

export default router;