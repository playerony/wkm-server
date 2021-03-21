import 'dotenv/config'
import App from './app'
import validateEnv from './utilities/validateEnv'
import IndexRoute from './routes/index.route'

validateEnv()

const app = new App([new IndexRoute()])

app.listen()
