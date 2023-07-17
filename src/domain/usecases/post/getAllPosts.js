class GetAllPosts {
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
    console.log('posts', posts);
    return post.reverse();
  }
}

module.exports = GetAllPosts;
