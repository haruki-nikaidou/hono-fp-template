import * as nodemailer from 'nodemailer';
import {EnvConfig} from '../../config';
import {IO} from 'fp-ts/IO';

const transporter = nodemailer.createTransport({
  host: EnvConfig.smtp.host,
  port: EnvConfig.smtp.port,
  secure: EnvConfig.smtp.secure,
  auth: {
    user: EnvConfig.smtp.user,
    pass: EnvConfig.smtp.pass,
  },
})

export const MailTransporter: IO<typeof transporter> = () => transporter;