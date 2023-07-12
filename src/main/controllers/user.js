const UserRepository = require('../../infra/repository/userRepository');
const CreateUser = require('../../domain/usecases/user/createUser');
const AuthenticateUser = require('../../domain/usecases/user/authenticateUser');
const ValidateDataRegisterUser = require('../../validation/user/validateDataRegisterUser');
const ValidateEmail = require('../../validation/user/validateEmail');

class UserController {
  async create(req, res) {
    try {
      const {
        name,
        secondName,
        email,
        telephone,
        genre,
        birthDate,
        password,
        confirmPassword,
      } = req.body;

      const userRepository = new UserRepository();
      const validateEmail = new ValidateEmail();
      // const createUser = new CreateUser(userRepository);

      const validateDataRegisterUser = new ValidateDataRegisterUser(
        userRepository,
        validateEmail
      );

      const authenticateUser = new AuthenticateUser(userRepository);
      const createUser = new CreateUser(
        userRepository,
        authenticateUser,
        validateDataRegisterUser
      );

      const token = await createUser.execute({
        name,
        secondName,
        email,
        telephone,
        genre,
        birthDate,
        password,
        confirmPassword,
      });
      return res.status(200).json({ ...token });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const userRepository = new UserRepository();

      const authenticateUser = new AuthenticateUser(userRepository);
      const token = await authenticateUser.execute({ email, password });
      console.log('token -> ', token);

      return res.status(200).json(token);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  }
}
module.exports = UserController;