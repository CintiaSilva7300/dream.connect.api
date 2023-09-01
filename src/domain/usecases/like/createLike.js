class CreateLike {
  constructor(likeRepository) {
    this.likeRepository = likeRepository;
  }

  async execute({ like, userCode, postCode }) {
    if (!like) {
      return 'Like precisa ser preenchido.';
    }

    const useLike = await this.likeRepository.create({
      like,
      userCode,
      postCode,
    });
    return useLike;
  }
}

module.exports = CreateLike;
