class GetAllPosts {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async execute() {
    const post = await this.postRepository.getAll();
    return post;
  }
}

module.exports = GetAllPosts;
