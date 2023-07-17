class GetOneUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ code }) {
    if (!code) throw new Error('Codigo é obrigatorio');

    const user = await this.userRepository.GetUserByCode({
      code,
    });
    return user;
  }
}

module.exports = GetOneUser;
