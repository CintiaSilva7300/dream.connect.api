const user = require('../../../infra/schema/user');

class GetAllLikes {
  constructor(postRepository, userRepository) {
    this.postRepository = postRepository;
    this.userRepository = userRepository;
  }

  async execute() {
    const post = await this.postRepository.getAll();
    const posts = await Promise.all(
      post.map(async (item) => {
        const user = await this.userRepository.GetUserByCode({
          code: item.userCode,
        });
        return {
          ...item._doc,
          user: {
            image:user?.image,
            name: user?.name,
            secondName: user?.secondName,
            email: user?.email,
            telephone: user?.telephone,
            genre: user?.genre,
            birthDate: user?.birthDate,
            registerDate: user?.registerDate,
          },
        };
      })
    );
    return posts.reverse();
  }
}

module.exports = GetAllLikes;
