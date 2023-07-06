class GetAllTests {
  constructor(testRepository) {
    this.testRepository = testRepository
  }

  async execute() {
    const test = await this.testRepository.getAll()
    return test
  }
}

module.exports = GetAllTests
