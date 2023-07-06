const { generateCode } = require('../../utils/generateCode');
const TestSchema = require('../schema/test');

class TestRepository {
  constructor() {
    this.testRepository = TestSchema;
  }

  async create({ name, value, date, type }) {
    const test = await this.testRepository.create({
      code: generateCode('TEST'),
      name,
      value,
      date,
      type,
    });
    return test;
  }

  async getOneByCode({ code }) {
    const filter = { code };
    const test = await this.testRepository.findOne(filter);
    return test;
  }

  async getAll() {
    const test = await this.testRepository.find();
    return test;
  }

  async deleteByCode({ code }) {
    const filter = { code };
    const test = await this.testRepository.deleteOne(filter);
    return test;
  }
}

module.exports = TestRepository;
