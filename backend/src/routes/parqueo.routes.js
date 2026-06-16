import { Router } from "express";
import { calcularCobro } from "../controller/parqueo.controller.js";

const router = Router();

router.post(`/calcular`, calcularCobro);

export default router;