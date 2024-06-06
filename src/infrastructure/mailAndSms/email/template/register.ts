import Handlebars = require('handlebars');
import * as fs from 'node:fs';

const source = fs.readFileSync('./src/infrastructure/mailAndSms/email/template/register.html', 'utf8');
const template = Handlebars.compile(source);

export function registerTemplate(
  appName: string,
  verifyCode: string
): string {
  return template({appName, verifyCode});
}