import {inspect} from 'util'

const logger = {
  ['info']: message => console.log(`ℹ️ INFO: ${message}`),
  ['debug']: (message, data = null) =>
    console.log('🐛  DEBUG', message, inspect(data, true, 7, true))
}

export default logger
