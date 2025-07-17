// src/controllers/auth.controller.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { nombre, email, contraseña, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email ya registrado' });

    const hashed = await bcrypt.hash(contraseña, 10);
    const user = new User({ nombre, email, contraseña: hashed, role });
    await user.save();

    res.status(201).json({ message: 'Usuario registrado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(contraseña, user.contraseña);
    if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '8h'
    });

    res.json({ token, user: { id: user._id, nombre: user.nombre, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
  }
};
