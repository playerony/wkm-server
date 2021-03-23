import { str, port, email, cleanEnv } from 'envalid'

const validateEnv = () => {
  cleanEnv(process.env, {
    PORT: port(),
    NODE_ENV: str(),
    JWT_SECRET: str(),
    EMAIL_LOGIN: email(),
    EMAIL_PASSWORD: str()
  })
}

export default validateEnv
