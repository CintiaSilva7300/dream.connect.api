class GetCommentByCode {
  constructor(commentRepository) {
    this.commentRepository = commentRepository;
  }

  async execute({ code }) {
    if (!code) throw new Error('Codigo é obrigatorio');

    const comment = await this.commentRepository.getOneByCode({
      code,
    });
    return comment;
  }
}

module.exports = GetCommentByCode;
