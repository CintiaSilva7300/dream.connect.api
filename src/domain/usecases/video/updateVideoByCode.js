class UpdateVideoByCode {
  constructor(videoRepository) {
    this.videoRepository = videoRepository;
  }

  async execute({ code }) {
    if (!code)
      throw new Error('Codigo é obrigatorio para atualizar as informações');
    const video = await this.videoRepository.updateVideoByCode({
      code,
    });
    return video;
  }
}

module.exports = UpdateVideoByCode;
