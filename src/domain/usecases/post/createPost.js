class CreatePost {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async execute({ text, url_media, userCode }) {
    if (!text && !url_media) {
      return 'Pelo menos um dos campos deve ser preenchido.';
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
