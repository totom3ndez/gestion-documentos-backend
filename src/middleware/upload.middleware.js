// src/middleware/upload.middleware.js
import multer from 'multer';
import path from 'path';

// Configuramos carpeta destino y nombre del archivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/');
  },
  filename: function (req, file, cb) {
  let nombrePersonalizado = req.body.nombreArchivo || req.query.nombreArchivo || null;
  const ext = path.extname(file.originalname);

  if (nombrePersonalizado) {
    nombrePersonalizado = nombrePersonalizado.replace(/[^a-zA-Z0-9_\-]/g, '');
    cb(null, nombrePersonalizado + ext);
  } else {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + ext);
  }
}
});

// Filtro para permitir solo PDF e imágenes
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos PDF o imágenes (jpeg, jpg, png)'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // límite 5MB
});
