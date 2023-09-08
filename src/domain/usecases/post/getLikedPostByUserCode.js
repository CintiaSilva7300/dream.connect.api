const user = require('../../../infra/schema/user');

class GetLikedPostByUserCode {
  constructor(postRepository, likeRepository, userRepository, commentRepository) {
    this.postRepository = postRepository;
    this.likeRepository = likeRepository;
    this.userRepository = userRepository;
    this.commentRepository = commentRepository;
  }

  async execute({userCode}) {
    const likes = await this.likeRepository.getLikesByUserCode(userCode)

    const postCodes = likes.map((like) => {
      return like.postCode
    })
    
    const postsLiked = await this.postRepository.getPostsByCodes(postCodes)
    
    const userCodes = postsLiked.map(postLiked => {
      return postLiked.userCode
    })
   
    const users = await this.userRepository.getUsersByCodes(userCodes)

    const comments = await this.commentRepository.getCommentsByCodesPosts(postCodes);

    const postFormatted = postsLiked.map(post => {
      const userFinded = users.find(user => user.code === post.userCode)
      const commentsFinded = comments.filter( comment => post.code === comment.postCode)
      const likesFinded = likes.filter((like) => like.postCode === post.code)
      return {
        ...post,
        user: {
          code: userFinded.code,
          email: userFinded.email,
          name: userFinded.name,
          image: userFinded.image
        },
        comments: commentsFinded,
        likes: likesFinded
      }
    })



    return postFormatted.reverse();
  }
}

module.exports = GetLikedPostByUserCode;
