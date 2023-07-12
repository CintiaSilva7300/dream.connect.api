const TestRepository = require('../../infra/repository/testRepository');

const CreateTest = require('../../domain/usecases/test/createTest');
const GetTestByCode = require('../../domain/usecases/test/getTestByCode');
const GetAllTests = require('../../domain/usecases/test/GetAllTests');
const DeleteTestByCode = require('../../domain/usecases/test/deleteTestByCode');

class TestController {
  async create(req, res) {
    try {
      const { name, value, date, type } = req.body;
      const testRepository = new TestRepository();
      const createTest = new CreateTest(testRepository);
      const test = await createTest.execute({ name, value, date, type });
      return res.status(200).json(test);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  }

  // async getOneByCode(req, res) {
  //   try {
  //     const { code } = req.params
  //     const testRepository = new TestRepository()
  //     const getTestByCode = new GetTestByCode(testRepository)
  //     const test = await getTestByCode.execute({ code })
  //     return res.status(200).json(test)
  //   } catch (error) {
  //     console.log(error)
  //     return res.status(400).json({ message: error.message })
  //   }
  // }

  // async getAll(req, res) {
  //   try {
  //     const testRepository = new TestRepository()
  //     const getAllTests = new GetAllTests(testRepository)
  //     const test = await getAllTests.execute()
  //     return res.status(200).json(test)
  //   } catch (error) {
  //     console.log(error)
  //     return res.status(400).json({ message: error.message })
  //   }
  // }

  // async deleteByCode(req, res) {
  //   try {
  //     const { code } = req.params
  //     const testRepository = new TestRepository()
  //     const deleteTestByCode = new DeleteTestByCode(testRepository)
  //     const result = await deleteTestByCode.execute({ code })
  //     return res.status(200).json(result)
  //   } catch (error) {
  //     console.log(error)
  //     return res.status(400).json({ message: error.message })
  //   }
  // }
}

module.exports = TestController;
