const chalk = require('chalk')

const app = require('./app')


app.get('/', (req, res) => {
  res.send('Hello, world')
})

app.listen(3000, () => {
  console.log(chalk.hex('#78dce8').bold('LISTENING ON PORT 3000'))
})