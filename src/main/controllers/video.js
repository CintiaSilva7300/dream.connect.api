const CreateVideo = require('../../domain/usecases/video/createVideo');
const VideoRepository = require('../../infra/repository/videoRepository');
const UpdateVideoByCode = require('../../domain/usecases/video/updateVideoByCode');
const GetAllVideos = require('../../domain/usecases/video/getAllVideos');
const GetVideoByCode = require('../../domain/usecases/video/getVideoByCode');
class VideoController {
  async create(req, res) {
    try {
      const { name, value, date, type } = req.body;
      const videoRepository = new VideoRepository();
      const createVideo = new CreateVideo(videoRepository);
      const video = await createVideo.execute({ name, value, date, type });
      return res.status(200).json(video);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getOneByCode(req, res) {
    try {
      const { code } = req.params;
      const videoRepository = new VideoRepository();
      const getVideoByCode = new GetVideoByCode(videoRepository);
      const video = await getVideoByCode.execute({ code });
      return res.status(200).json(video);
    } catch (error) {
      console.log('parou aqui -------> ', error);
      return res.status(400).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const videoRepository = new VideoRepository();
      const getAllVideos = new GetAllVideos(videoRepository);
      const video = await getAllVideos.execute();
      return res.status(200).json(video);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  }

  //   async deleteByCode(req, res) {
  //     try {
  //       const { code } = req.params
  //       const testRepository = new TestRepository()
  //       const deleteTestByCode = new DeleteTestByCode(testRepository)
  //       const result = await deleteTestByCode.execute({ code })
  //       return res.status(200).json(result)
  //     } catch (error) {
  //       console.log(error)
  //       return res.status(400).json({ message: error.message })
  //     }
  //   }

  async updateByCode(req, res) {
    try {
      const { code } = req.params;
      const { name, value, date, type } = req.body;
      const videoRepository = new VideoRepository();
      const updateVideoByCode = new UpdateVideoByCode(videoRepository);
      const result = await updateVideoByCode.execute({
        code,
        name,
        value,
        date,
        type,
      });
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = VideoController;
