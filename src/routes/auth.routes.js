// src/routes/auth.routes.js
import express from 'express';
import { login, register } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register); // solo para pruebas (luego solo admin puede registrar usuarios)

export default router;
