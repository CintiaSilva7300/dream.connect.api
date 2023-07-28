import multer from 'multer';
import path from 'path';
import seila from '../../utils/imageTmp';
import crypto from 'crypto';

const imgTempFolder = path.resolve(__dirname, '..', '..', 'utils', 'imageTmp');

export default {
  directory: imgTempFolder,
  storage: multer.diskStorage({
    destination: imgTempFolder,
    filename(request, file, callback) {
      const fileHash = crypto.handomBytes(10).toString('hex');

      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
