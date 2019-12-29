import {Signale} from 'signale'

export const logger = () => {
  const options = {
    types: {
      error: {
        badge: '⚠️',
        color: 'red',
        label: 'Error'
      },
      success: {
        badge: '👍🏻',
        color: 'blue',
        label: 'Success'
      },
      debug: {
        badge: '🐛',
        color: 'yellow',
        label: 'Debug'
      }
    }
  }

  const logger = new Signale(options)
  logger.success('Init logger')
  return logger
}
