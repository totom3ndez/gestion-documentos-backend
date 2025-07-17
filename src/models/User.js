// src/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    role: {
      type: String,
      enum: ['cliente', 'contable', 'admin'],
      default: 'cliente'
    },
    rfc: { type: String },
    telefono: { type: String },
    contableId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // sólo para clientes
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
