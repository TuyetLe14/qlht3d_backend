import nodemailer from 'nodemailer'

const sendEmail = async (email: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOT_EMAIL,
    service: process.env.SERVICE_EMAIL,
    secure: true,
    port: 465,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASS_EMAIL,
    },
  })

  return await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: email,
    subject,
    html,
  })
}

export default sendEmail
