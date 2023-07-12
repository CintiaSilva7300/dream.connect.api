class CreatePost {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async execute({ text, url_media, userCode }) {
    if (!text && !url_media) {
      return 'Pelo menos um dos campos deve ser preenchido.';
    }

    const post = await this.postRepository.create({
      text,
      url_media,
      userCode,
    });
    return post;
  }
}

module.exports = CreatePost;
