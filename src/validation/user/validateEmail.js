const { validate } = require('email-validator');

class ValidateEmail {
  execute(email) {
    try {
      if (!email || typeof email !== 'string') {
        throw new Error('Email é obrigatório e deve ser uma string!');
      }

      const lowercaseEmail = email.toLowerCase(); // Converte todas as letras para minúsculas

      if (!validate(lowercaseEmail)) {
        throw new Error('Email inválido!'); // O email não é válido
      }

      return true; // O email é válido
    } catch (error) {
      throw error; // Lança a exceção em caso de erro
    }
  }
}

module.exports = ValidateEmail;
