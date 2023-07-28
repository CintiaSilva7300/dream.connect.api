const user = require('../../../infra/schema/user');

class GetAllPosts {
  constructor(postRepository, userRepository, commentRepository) {
    this.postRepository = postRepository;
    this.userRepository = userRepository;
    this.commentRepository = commentRepository;
  }

  async execute() {
    const post = await this.postRepository.getAll();
    const posts = await Promise.all(
      post.map(async (item) => {
        const user = await this.userRepository.GetUserByCode({
          code: item.userCode,
        });
        const comments = await this.commentRepository.getByCodePost(item.code);
        return {
          ...item._doc,
          user: {
            name: user?.name,
            secondName: user?.secondName,
            email: user?.email,
            telephone: user?.telephone,
            genre: user?.genre,
            birthDate: user?.birthDate,
            registerDate: user?.registerDate,
          },
          comments,
        };
      })
    );
    return posts.reverse();
  }
}

module.exports = GetAllPosts;
