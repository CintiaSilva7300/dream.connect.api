const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

class AuthenticateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    if (!email || typeof email !== 'string') {
      throw new Error('Email é invalido!');
    }

    if (!password) {
      throw new Error('Senha  é obrigatorio!');
    }

    const userFinded = await this.userRepository.findByEmail(email);

    if (!userFinded) {
      throw new Error('Usuário não cadastrado');
    }

    const authorized = bcrypt.compareSync(password, userFinded.password);
    if (!authorized) {
      throw new Error('Senha incorreta');
    }

    const token = jwt.sign(
      {
        id: userFinded._id,
        email: userFinded.email,
        secondName: userFinded.secondName,
        name: userFinded.name,
        code: userFinded.code,
        image: userFinded.image,
        telephone: userFinded.telephone,
        genre: userFinded.genre,
        birthDate: userFinded.birthDate,
      },
      SECRET_KEY_JWT
    );

    return { token };
  }
}

module.exports = AuthenticateUser;
