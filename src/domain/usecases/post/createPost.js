class CreatePost {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async execute({ text, url_media, userCode }) {

    if (!url_media) {
      return 'È obrigatorio inserir uma imagem.';
    }

    const post = await this.postRepository.create({
      userCode,
      text,
      url_media,
    });
    return post;
  }
}

module.exports = CreatePost;
