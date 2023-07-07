class UpdateVideoByCode {
  constructor(videoRepository) {
    this.videoRepository = videoRepository;
  }

  async execute({ code, name, value, date, type }) {
    if (!code)
      throw new Error('Codigo é obrigatorio para atualizar as informações');
    const video = await this.videoRepository.updateVideoByCode({
      code,
      name,
      value,
      date,
      type,
    });
    return video;
  }
}

module.exports = UpdateVideoByCode;
