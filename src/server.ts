import 'dotenv/config'

import App from './app'

import MailRoute from './routes/mail.route'
import IndexRoute from './routes/index.route'

import validateEnv from './utilities/validateEnv'

validateEnv()

const app = new App([new IndexRoute(), new MailRoute()])

app.listen()
