const CreatePost = require('../../domain/usecases/post/createPost');
const PostRepository = require('../../infra/repository/postRepository');
const UpdatePostByCode = require('../../domain/usecases/post/updatePostByCode');
const GetAllPosts = require('../../domain/usecases/post/getAllPosts');
const GetPostByCode = require('../../domain/usecases/post/getPostByCode');
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;
const jwt = require('jsonwebtoken');
class PostController {
  async create(req, res) {
    try {
      const token = req.headers['authorization'];
      // console.log('passou por aqui -> ', token);

      if (!token) {
        throw new Error('È nescessario estár logado!');
      }

      const tokenValue = token.slice(7); // Remova o prefixo "Bearer " para obter o valor do token
      token && token.startsWith('Bearer ');
      const decodedToken = jwt.verify(tokenValue, SECRET_KEY_JWT);

      const userCode = decodedToken.code;

      const { text, url_media } = req.body;
      const postRepository = new PostRepository();
      const createPost = new CreatePost(postRepository);
      const post = await createPost.execute({
        text,
        url_media,
        userCode,
      });
      return res.status(200).json(post);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getOneByCode(req, res) {
    try {
      const { code } = req.params;
      const postRepository = new PostRepository();
      const getPostByCode = new GetPostByCode(postRepository);
      const post = await getPostByCode.execute({ code });
      return res.status(200).json(post);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const postRepository = new PostRepository();
      const getAllPosts = new GetAllPosts(postRepository);
      const post = await getAllPosts.execute();
      return res.status(200).json(post);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  }

  // async deleteByCode(req, res) {
  //   try {
  //     const { code } = req.params
  //     const testRepository = new TestRepository()
  //     const deleteTestByCode = new DeleteTestByCode(testRepository)
  //     const result = await deleteTestByCode.execute({ code })
  //     return res.status(200).json(result)
  //   } catch (error) {
  //     console.log(error)
  //     return res.status(400).json({ message: error.message })
  //   }
  // }

  async updateByCode(req, res) {
    try {
      const token = req.headers['authorization'];
      console.log('passou por aqui -> ', token);

      if (!token) {
        throw new Error('È nescessario estár logado!');
      }

      const tokenValue = token.slice(7); // Remova o prefixo "Bearer " para obter o valor do token
      token && token.startsWith('Bearer ');

      const decodedToken = jwt.verify(tokenValue, SECRET_KEY_JWT);
      const userCode = decodedToken.code;

      const { code } = req.params; //pega codigo pela "url"
      const { text, url_media } = req.body;
      const postRepository = new PostRepository();
      const updatePostByCode = new UpdatePostByCode(postRepository);
      const result = await updatePostByCode.execute({
        code,
        userCode,
        text,
        url_media,
      });
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = PostController;
