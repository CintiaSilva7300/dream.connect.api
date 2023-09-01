const CreateLike = require('../../domain/usecases/like/createLike');
const LikeRepository = require('../../infra/repository/likeRepository');
const UserRepository = require('../../infra/repository/userRepository');
const GetAllLikes = require('../../domain/usecases/like/getAllLikes');

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;
const jwt = require('jsonwebtoken');

class LikeController {
  async create(req, res) {
    try {
      console.log("====>", req.body);
      const token = req.headers['authorization'];

      if (!token) {
        throw new Error('È nescessario estár logado!');
      }

      const tokenValue = token.slice(7); 
      token && token.startsWith('Bearer ');
      const decodedToken = jwt.verify(tokenValue, SECRET_KEY_JWT);

      const userCode = decodedToken.code;

      
    const { like, postCode } = req.body;
      const likeRepository = new LikeRepository();
      const createLike = new CreateLike(likeRepository);
      const liked = await createLike.execute({
        like,
        userCode,
        postCode,
      });
      return res.status(200).json(liked);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      console.log('chegou aqui');
      const likeRepository = new LikeRepository();
      const userRepository = new UserRepository();
      const getAllLikes = new GetAllLikes(
        likeRepository,
        userRepository
      );
      const like = await getAllLikes.execute();
      console.log('chegou aqui 1');
      return res.status(200).json(like);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  
  
}
module.exports = LikeController;
