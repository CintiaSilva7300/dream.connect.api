const { validate } = require('email-validator');

class ValidateEmail {
  execute(email) {
    try {
      const isValid = validate(email);

      return isValid;
    } catch (error) {
      return false;
    }
  }
}

module.exports = ValidateEmail;
