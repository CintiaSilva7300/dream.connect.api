class CreateVideo {
  constructor(videoRepository) {
    this.videoRepository = videoRepository;
  }

  async execute({ name, value, date, type }) {
    if (!name) throw new Error('Name é obrigatorio');
    if (!value) throw new Error('Valor é obrigatorio');
    if (!date) throw new Error('Data é obrigatorio');

    const video = await this.videoRepository.create({
      name,
      value,
      date,
      type,
    });
    return video;
  }
}

module.exports = CreateVideo;
