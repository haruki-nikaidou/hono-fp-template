import chalk from 'chalk';

const ErrorMessage = chalk.red('Error');
const InfoMessage = chalk.green('Info');
const WarningMessage = chalk.yellow('Warning');

function error(message: any) {
  const time = new Date().toISOString();
  console.log(`${ErrorMessage} [${time}]: ${message}`);
}

function info(message: any) {
  const time = new Date().toISOString();
  console.log(`${InfoMessage} [${time}]: ${message}`);
}

function warning(message: any) {
  const time = new Date().toISOString();
  console.log(`${WarningMessage} [${time}]: ${message}`);
}

export const trace = {
  error,
  info,
  warning
}