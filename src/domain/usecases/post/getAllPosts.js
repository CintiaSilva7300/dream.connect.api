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

        const comment = await Promise.all(
          comments.map(async (user) => {
            const userBody = await this.userRepository.GetUserByCode({
              code: user.userCode,
            });
            return {
              ...user,
              user: {
                name: userBody.name,
                email: userBody.email,
                secondName: userBody.secondName,
                registerDate: userBody.registerDate,
              },
            };
          })
        );
        console.log('->>', comment);
        // const curtida = await this.commentRepository.getByCodePost(item.curti);
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

          comments: comment,
        };
      })
    );
    return posts.reverse();
  }
}

module.exports = GetAllPosts;
