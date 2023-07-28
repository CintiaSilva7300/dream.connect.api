class CreateComment {
  constructor(commentRepository) {
    this.commentRepository = commentRepository;
  }

  async execute({ text, url_media, userCode, postCode }) {
    if (!text && !url_media) {
      return 'Pelo menos um dos campos deve ser preenchido.';
    }

    const comment = await this.commentRepository.create({
      text,
      url_media,
      userCode,
      postCode,
    });
    return comment;
  }
}

module.exports = CreateComment;
