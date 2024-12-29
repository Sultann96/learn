import { config } from "dotenv"
import nodemailer from "nodemailer"

config()

const { SMTP_PASS, MAIL } = process.env
const transport = nodemailer.createTransport({
  service: "mail.ru",
  auth: {
    user: MAIL,
    pass: SMTP_PASS
  }
})
export default async ({
  to,
  text,
  subject
}: {
  to: string
  text: string
  subject: string
}) =>
  transport.sendMail({
    from: MAIL,
    to: to,
    subject: subject,
    html: text
  })
