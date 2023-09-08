const CreateLike = require('../../domain/usecases/like/createLike');
const LikeRepository = require('../../infra/repository/likeRepository');
const UserRepository = require('../../infra/repository/userRepository');
const GetAllLikes = require('../../domain/usecases/like/getAllLikes');
const GetLikeByCode = require('../../domain/usecases/like/getLikeByCode');

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;
const jwt = require('jsonwebtoken');
const PostRepository = require('../../infra/repository/postRepository');

class LikeController {
  async create(req, res) {
    try {
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

  async getOneByCode(req, res) {
    try {
      const { code } = req.params;
      const likeRepository = new LikeRepository();
      const getLikeByCode = new GetLikeByCode(likeRepository);
      const like = await getLikeByCode.execute({ code });
      return res.status(200).json(like );
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const likeRepository = new LikeRepository();
      const userRepository = new UserRepository();
      const getAllLikes = new GetAllLikes(
        likeRepository,
        userRepository
      );
      const like = await getAllLikes.execute();

      return res.status(200).json(like);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  
  
}
module.exports = LikeController;
