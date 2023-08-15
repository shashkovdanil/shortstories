import { Buffer } from 'node:buffer'
import crypto from 'node:crypto'
import { Resend } from 'resend'

export async function generatePasswordHash(password: string) {
  const saltRounds = 10

  return new Promise<string>(resolve => {
    crypto.randomBytes(saltRounds, (_, salt) => {
      crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (_, derivedKey) => {
        resolve(`${salt.toString('base64')}:${derivedKey.toString('hex')}`)
      })
    })
  })
}

export async function validatePassword(
  password: string,
  hashedPassword: string,
) {
  const [salt, derivedKey] = hashedPassword.split(':')
  const saltBuffer = Buffer.from(salt, 'base64')

  return new Promise<boolean>(resolve => {
    crypto.pbkdf2(password, saltBuffer, 10000, 64, 'sha512', (_, key) => {
      resolve(key.toString('hex') === derivedKey)
    })
  })
}

const makeNiceEmail = (text: string) => `
  <div style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Hello!</h2>
    <p>${text}</p>
    <p>😘, Shortstories Team</p>
  </div>
`

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendMail({
  subject,
  text,
  to,
}: {
  subject: string
  text: string
  to: string
}) {
  try {
    await resend.emails.send({
      from: 'Shortstories <no-reply@shortstories.im>',
      html: makeNiceEmail(text),
      subject,
      to: [to],
    })
  } catch (error) {
    console.error(error)
  }
}
