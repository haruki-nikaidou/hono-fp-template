import * as IO from 'fp-ts/IO';
import * as TO from 'fp-ts/TaskOption';
import {TransporterType} from './transporter';
import {registerTemplate} from './template/register';
import {EnvConfig} from '../../config';

export function sendRegisterEmail (
  to: string,
  code: string,
  transporter: IO.IO<TransporterType>,
): TO.TaskOption<void> {
  return TO.tryCatch(async () => {
    const transport = transporter();
    await transport.sendMail({
      from: `${EnvConfig.appName} <${EnvConfig.smtp.user}>`,
      to,
      subject: `Your verification code: ${code}`,
      html: registerTemplate(EnvConfig.appName, code)
    });
  });
}