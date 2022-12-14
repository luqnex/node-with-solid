import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

import * as dotenv from "dotenv";

import { MailProvider, Message } from "../MailProvider";

dotenv.config();

export class MailtrapMailProvider implements MailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP,
      },
    });
  }

  async sendMail(message: Message): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    });
  }
}
