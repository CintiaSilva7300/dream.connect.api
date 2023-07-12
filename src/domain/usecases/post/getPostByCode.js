class GetPostByCode {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async execute({ code }) {
    if (!code) throw new Error('Codigo é obrigatorio');

    const post = await this.postRepository.getOneByCode({
      code,
    });
    return post;
  }
}

module.exports = GetPostByCode;
