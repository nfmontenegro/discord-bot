import moment from 'moment'

export function cleanCommand(command, message) {
  return message
    .split(command)
    .pop()
    .trim()
}

export function toDay() {
  return moment()
    .subtract(3, 'h')
    .format('YYYY/MM/DD')
}

export const commands = [
  '!wikipedia',
  '!bip',
  '!clima',
  '!rut',
  '!diario',
  '!translate',
  '!gif',
  '!youtube'
]
