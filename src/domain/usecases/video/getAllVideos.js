class GetAllVideos {
  constructor(videoRepository) {
    this.videoRepository = videoRepository;
  }

  async execute() {
    const video = await this.videoRepository.getAll();
    return video;
  }
}

module.exports = GetAllVideos;
