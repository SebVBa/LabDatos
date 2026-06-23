import { Router } from "express";
import { verificarUsuario } from "../controller/usuario.controller.js";
import { obtenerUsuarios } from "../controller/usuario.controller.js";
import { obtenerUsuarioPorId } from "../controller/usuario.controller.js";
import {actualizarUsuario } from "../controller/usuario.controller.js";
import { eliminarUsuario } from "../controller/usuario.controller.js";
import { autenticar } from "../controller/usuario.controller.js";

const router = Router();

router.post(`/verificarUsuario`, verificarUsuario);
router.get(`/obtenerUsuarios`, obtenerUsuarios);
router.get(`/obtenerUsuarioPorId`, obtenerUsuarioPorId);
router.patch(`/actualizarUsuario`, actualizarUsuario);
router.delete(`/eliminarUsuario`, eliminarUsuario);
router.post(`/autenticar`, autenticar);

export default router;