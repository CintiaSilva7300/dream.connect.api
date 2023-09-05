class GetLikeByCode {
  constructor(likeRepository) {
    this.likeRepository = likeRepository;
  }

  async execute({ code }) {
    if (!code) throw new Error('Codigo é obrigatorio');

    const like = await this.likeRepository.getOneByCode({
      code,
    });
    return like;
  }
}

module.exports = GetLikeByCode;
