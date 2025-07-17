// src/models/Documento.js
import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tipo: { type: String, enum: ['gasto', 'ingreso'], required: true },
  archivoUrl: { type: String, required: true }, // ruta relativa al archivo
  comentario: { type: String },
  fechaCarga: { type: Date, default: Date.now },
  nombrePersonalizado: { type: String },
});

export default mongoose.model('Document', documentSchema);
