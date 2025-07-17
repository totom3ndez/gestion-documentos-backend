// src/controllers/documento.controller.js
import Document from '../models/Document.js';

export const subirDocumento = async (req, res) => {
  try {
    const { tipo, comentario, nombreArchivo } = req.body;
    const clienteId = req.user.id; // viene del token JWT

    if (!req.file) {
      return res.status(400).json({ message: 'Archivo requerido' });
    }

    const archivoUrl = req.file.path; // ruta local
    const nombrePersonalizado = nombreArchivo || req.file.filename;
    const documento = new Document({
      clienteId,
      tipo,
      comentario,
      archivoUrl,
      nombrePersonalizado
    });

    await documento.save();

    res.status(201).json({ message: 'Documento cargado', documento });
  } catch (err) {
    res.status(500).json({ message: 'Error al subir documento', error: err.message });
  }
};
