class GetTestByCode {
  constructor(testRepository) {
    this.testRepository = testRepository
  }

  async execute({ code }) {
    if (!code) throw new Error('Codigo é obrigatorio')

    const test = await this.testRepository.getOneByCode({
      code
    })
    return test
  }
}

module.exports = GetTestByCode
