const { generateCode } = require('../../utils/generateCode');
const CommentSchema = require('../schema/comment');

class CommentRepository {
  constructor() {
    this.commentRepository = CommentSchema;
  }

  async create({ text, url_media, userCode, postCode }) {
    const post = await this.commentRepository.create({
      code: generateCode('COMMENT'),
      text,
      url_media,
      userCode,
      postCode,
    });
    return post;
  }

  async getOneByCode({ code }) {
    const filter = { code };
    const comment = await this.commentRepository.findOne(filter);
    return comment;
  }

  async getAll() {
    const comment = await this.commentRepository.find();
    return comment;
  }

  async getByCodePost(code) {
    const filter = { postCode: code };
    const comments = await this.commentRepository.find(filter);
    return comments;
  }
}

module.exports = CommentRepository;
