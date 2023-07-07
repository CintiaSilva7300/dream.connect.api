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

  async getOneByCode({ code }) {
    const filter = { code };
    const video = await this.videoRepository.findOne(filter);
    return video;
  }

  async getAll() {
    const video = await this.videoRepository.find();
    return video;
  }

  // async deleteByCode({ code }) {
  //   const filter = { code };
  //   const test = await this.testRepository.deleteOne(filter);
  //   return test;
  // }

  async updateVideoByCode({ code, name, value, date, type }) {
    const body = {
      name,
      value,
      date,
      type,
    };
    const filter = { code };
    const video = await this.videoRepository.findOneAndUpdate(filter, body);
    return video;
  }
}

module.exports = VideoRepository;
