class ValidateDataRegisterUser {
  constructor(userRepository, validateEmail) {
    this.userRepository = userRepository;
    this.validateEmail = validateEmail;
  }

  async execute({ name, email, password, confirmPassword }) {
    if (password !== confirmPassword) {
      throw new Error('As senhas não estão iguais');
    }

    if (!this.validateEmail.execute(email)) {
      throw new Error('Email inválido');
    }

    if (!name) {
      throw new Error('Nome é um campo obrigatorio.');
    }
    if (!email) {
      throw new Error('E-mail é um campo obrigatorio.');
    }

    if (!password) {
      throw new Error('Senha é um campo obrigatorio.');
    }

    const userFinded = await this.userRepository.findByEmail(email);

    if (userFinded) {
      throw new Error('O Email já se encontra cadastrado!');
    }

    return false;
  }
}

module.exports = ValidateDataRegisterUser;
