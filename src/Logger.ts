import chalk from 'chalk';

export default function logger(...messages: any[]): any {
  const log = console.log;
  const message = chalk.bgYellow.black.bold`${JSON.stringify(messages)}`;
  return log(message);
}
