const { generateCode } = require('../../utils/generateCode');
const PostSchema = require('../schema/postSchema');

class PostRepository {
  constructor() {
    this.postRepository = PostSchema;
  }

  async create({ text, url_media, userCode }) {
    const post = await this.postRepository.create({
      code: generateCode('POST'),
      text,
      url_media,
      userCode,
    });
    return post;
  }

  async getOneByCode({ code }) {
    const filter = { code };
    console.log('getOneByCode ->', code);
    const post = await this.postRepository.findOne(filter);
    return post;
  }

  async getAll() {
    const post = await this.postRepository.find();
    return post;
  }

  // async deleteByCode({ code }) {
  //   const filter = { code };
  //   const test = await this.testRepository.deleteOne(filter);
  //   return test;
  // }

  async updatePostByCode({ code, text, url_media }) {
    const body = {
      text,
      url_media,
    };
    const filter = { code };
    const post = await this.postRepository.findOneAndUpdate(filter, body);
    return post;
  }
}

module.exports = PostRepository;
