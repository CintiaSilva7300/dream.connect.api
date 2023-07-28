const CreateComment = require('../../domain/usecases/comment/createComment');
const CommentRepository = require('../../infra/repository/commentRepository');
const GetCommentByCode = require('../../domain/usecases/comment/getCommentByCode');
const UserRepository = require('../../infra/repository/userRepository');
const GetAllComments = require('../../domain/usecases/comment/getAllComments');
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;
const jwt = require('jsonwebtoken');

class CommentController {
  async create(req, res) {
    try {
      const token = req.headers['authorization'];

      if (!token) {
        throw new Error('È nescessario estár logado!');
      }

      const tokenValue = token.slice(7); // Remova o prefixo "Bearer " para obter o valor do token
      token && token.startsWith('Bearer ');
      const decodedToken = jwt.verify(tokenValue, SECRET_KEY_JWT);

      const userCode = decodedToken.code;

      const { text, url_media, postCode } = req.body;
      const commentRepository = new CommentRepository();
      const createComment = new CreateComment(commentRepository);
      const comment = await createComment.execute({
        text,
        url_media,
        userCode,
        postCode,
      });
      return res.status(200).json(comment);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getOneByCode(req, res) {
    try {
      const { code } = req.params;
      const commentRepository = new CommentRepository();
      const getCommentByCode = new GetCommentByCode(commentRepository);
      const comment = await getCommentByCode.execute({ code });
      console.log(comment);
      return res.status(200).json(comment);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const commentRepository = new CommentRepository();
      const userRepository = new UserRepository();
      const getAllComments = new GetAllComments(
        commentRepository,
        userRepository
      );
      const comment = await getAllComments.execute();
      console.log(comment);
      return res.status(200).json(comment);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
module.exports = CommentController;
