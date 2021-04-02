import { str, port, email, cleanEnv, url } from 'envalid'

const validateEnv = () => {
  cleanEnv(process.env, {
    PORT: port(),
    NODE_ENV: str(),
    CLIENT_URL: url(),
    EMAIL_LOGIN: email(),
    EMAIL_PASSWORD: str()
  })
}

export default validateEnv
