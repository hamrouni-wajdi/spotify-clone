const chalk = require('chalk');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './.env' });
const app = require('./app');

// Connect to the database
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB).then(() => {
  console.log(chalk.hex('#78dce8').bold('DATABASE CONNECTION SUCCESSFUL'));
});

app.get('/', (req, res) => {
  res.send('Hello, world');
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(
    chalk.hex('#78dce8').bold(`LISTENING ON PORT ${process.env.PORT}`)
  );
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log(
    chalk.hex('#ff6188').bold('UNHANDLED REJECTION! 💥 Shutting down...')
  );
  server.close(() => {
    process.exit(1);
  });
});
