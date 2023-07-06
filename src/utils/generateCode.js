function generateCode(entityName) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * caracteres.length)
    code += caracteres.charAt(randomIndex)
  }

  return `${entityName.toUpperCase()}-${code}`
}

module.exports = { generateCode }
