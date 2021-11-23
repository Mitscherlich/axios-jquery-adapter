import { createServer } from 'http'
import app from './app'

module.exports = (done) => {
  global.server = createServer(app).listen(3000, '0.0.0.0', done)
}
