import 'dotenv/config'
import App from './app'

import MailRoute from './routes/mail.route'

import validateEnv from './utilities/validateEnv'

validateEnv()

const app = new App([new MailRoute()])

app.listen()
