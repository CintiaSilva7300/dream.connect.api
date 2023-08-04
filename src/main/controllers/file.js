const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

class FileController {
  constructor() {
    const MONGO_HOST = process.env.MONGO_HOST;
    const MONGO_USER = process.env.MONGO_USER;
    const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
    const url = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}`;

    this.conn = mongoose.createConnection(url);
    this.gfs = null;

    this.initGridFs();
  }

  initGridFs() {
    this.conn.once('open', () => {
      this.gfs = Grid(this.conn.db, mongoose.mongo);
      this.gfs.collection('media');
    });
  }

  getFile(req, res) {
    const fileId = req.params.id; // O ID do arquivo que foi armazenado no MongoDB
    const readStream = this.gfs.createReadStream({ _id: fileId });

    readStream.on('error', (err) => {
      res.status(404).json({ error: 'Arquivo não encontrado' });
    });

    readStream.pipe(res);
  }
}
module.exports = FileController;
