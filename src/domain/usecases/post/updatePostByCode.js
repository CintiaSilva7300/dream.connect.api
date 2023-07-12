class UpdatePostByCode {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async execute({ code, text, url_media }) {
    if (!code)
      throw new Error('Codigo é obrigatorio para atualizar as informações');
    const post = await this.postRepository.updatePostByCode({
      code,
      text,
      url_media,
    });
    return post;
  }
}

module.exports = UpdatePostByCode;
