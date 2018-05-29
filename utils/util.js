import moment from 'moment'

export const cleanCommand = (command, message) =>
  message
    .split(command)
    .pop()
    .trim()

export const toDay = () => {
  const date = new Date()
  return moment(date)
    .format('YYYY-MM-DD')
    .replace(new RegExp('-', 'g'), '/')
}

export const commands = [
  '!wikipedia',
  '!bip',
  '!clima',
  '!rut',
  '!diario',
  '!translate'
]
