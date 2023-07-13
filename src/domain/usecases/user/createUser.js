const bcrypt = require('bcrypt');
const SALT = process.env.SALT;

class CreateUser {
  constructor(userRepository, authenticateUser, validateDataRegisterUser) {
    this.userRepository = userRepository;
    this.authenticateUser = authenticateUser;
    this.validateDataRegisterUser = validateDataRegisterUser;
  }

  async execute({
    name,
    secondName,
    email,
    telephone,
    genre,
    birthDate,
    password,
    confirmPassword,
  }) {
    await this.validateDataRegisterUser.execute({
      name,
      secondName,
      email,
      telephone,
      genre,
      birthDate,
      password,
      confirmPassword,
    });

    const hashPassword = bcrypt.hashSync(password, Number(SALT));

    await this.userRepository.create({
      name,
      secondName,
      email,
      telephone,
      genre,
      birthDate,
      password: hashPassword,
      status: true,
      typeLogin: 'email',
    });
    const token = this.authenticateUser.execute({ email, password });
    return token;
  }
}

module.exports = CreateUser;
