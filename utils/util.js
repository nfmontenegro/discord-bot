import moment from 'moment'

export const cleanCommand = (command, message) =>
  message
    .split(command)
    .pop()
    .trim()

export const toDay = () => moment().format('YYYY/MM/DD')

export const commands = [
  '!wikipedia',
  '!bip',
  '!clima',
  '!rut',
  '!diario',
  '!translate',
  '!gif'
]
