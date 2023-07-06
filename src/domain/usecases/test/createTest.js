class CreateTest {
  constructor(testRepository) {
    this.testRepository = testRepository
  }

  async execute({ name, value, date, type }) {
    if (!name) throw new Error('Name é obrigatorio')
    if (!value) throw new Error('Valor é obrigatorio')
    if (!date) throw new Error('Data é obrigatorio')

    const test = await this.testRepository.create({
      name,
      value,
      date,
      type
    })
    return test
  }
}

module.exports = CreateTest
