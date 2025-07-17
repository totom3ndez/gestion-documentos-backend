// src/routes/documento.routes.js
import express from 'express';
import { subirDocumento } from '../controllers/document.controller.js';
import { verificarToken, verificarRol } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = express.Router();

function requireNombreArchivo(req, res, next) {
  if (!req.params.nombreArchivo) {
    return res.status(400).json({ message: 'El parámetro nombreArchivo es requerido' });
  }
  next();
}

router.post(
  '/upload',
  verificarToken,
  verificarRol('cliente'),
  upload.single('archivo'),
  subirDocumento
);

export default router;
