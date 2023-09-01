const { generateCode } = require('../../utils/generateCode');
const LikeSchema = require('../schema/like');

class LikeRepository {
  constructor() {
    this.likeRepository = LikeSchema;
  }

  async create({ like, userCode, postCode }) {
    const post = await this.likeRepository.create({
      code: generateCode('LIKE'),
      like,
      userCode,
      postCode,
    });
    return post;
  }

  // async getOneByCode({ code }) {
  //   const filter = { code };
  //   const like = await this.likeRepository.findOne(filter);
  //   return like;
  // }

  // async getAll() {
  //   const like = await this.likeRepository.find();
  //   return like;
  // }

  // async getByCodePost(code) {
  //   const filter = { postCode: code };
  //   const likes = await this.likeRepository.find(filter).lean();
  //   return likes;
  // }
}

module.exports = LikeRepository;
