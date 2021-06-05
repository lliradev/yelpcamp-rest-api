import multer from 'multer';
import path from 'path';
import { v4 } from 'uuid';

const uuid = v4();

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, uuid + path.extname(file.originalname));
  },
});

export default multer({ storage });
