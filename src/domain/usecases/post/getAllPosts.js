const user = require('../../../infra/schema/user');

class GetAllPosts {
  constructor(postRepository, userRepository, commentRepository, likeRepository) {
    this.postRepository = postRepository;
    this.userRepository = userRepository;
    this.commentRepository = commentRepository;
    this.likeRepository = likeRepository;
  }

  async execute() {

    const post = await this.postRepository.getAll();

    const posts = await Promise.all(
      post.map(async (item) => {
        const user = await this.userRepository.GetUserByCode({
          code: item.userCode,
        });

        // const likes = await this.likeRepository.getByCodePost(item.code);
        const likes = await this.likeRepository.getByCodePost(item.code);

        // Mapeie os likes para incluir informações do usuário que curtiu
        const likeInfo = await Promise.all(
          likes.map(async (like) => {
            const liker = await this.userRepository.GetUserByCode({
              code: like.userCode,
            });
            return {
              user: {
                image: liker.image,
                name: liker.name,
                email: liker.email,
                secondName: liker.secondName,
                registerDate: liker.registerDate,
              },
            };
          })
        );

        const comments = await this.commentRepository.getByCodePost(item.code);

        const comment = await Promise.all(
          comments.map(async (user) => {
            const userBody = await this.userRepository.GetUserByCode({
              code: user.userCode,
            });
            return {
              ...user,
              user: {
                image: userBody.image,
                name: userBody.name,
              },
            };
          })
        );


        return {
          ...item._doc,
          user: {
            name: user?.name,
            image: user?.image,
            secondName: user?.secondName,
            email: user?.email,
            telephone: user?.telephone,
            genre: user?.genre,
            birthDate: user?.birthDate,
            registerDate: user?.registerDate,
          },
          comments: comment,
          likes: likeInfo
        };
      })
    );
    return posts.reverse();
  }
}

module.exports = GetAllPosts;
