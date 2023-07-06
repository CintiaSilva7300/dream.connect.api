const { generateCode } = require('../../utils/generateCode');
const VideoSchema = require('../schema/videoSchema');

class VideoRepository {
  constructor() {
    this.videoRepository = VideoSchema;
  }

  async create({ name, value, date, type }) {
    const video = await this.videoRepository.create({
      code: generateCode('VIDEO'),
      name,
      value,
      date,
      type,
    });
    return video;
  }

  // async getOneByCode({ code }) {
  //   const filter = { code };
  //   const test = await this.testRepository.findOne(filter);
  //   return test;
  // }

  async getAll() {
    const video = await this.videoRepository.find();
    return video;
  }

  // async deleteByCode({ code }) {
  //   const filter = { code };
  //   const test = await this.testRepository.deleteOne(filter);
  //   return test;
  // }

  async updateVideoByCode({ code }) {
    const filter = { code };
    const video = await this.videoRepository.updateMany(filter);
    return video;
  }
}

module.exports = VideoRepository;
