import moment from 'moment'

export function cleanCommand(command, message) {
  return message
    .split(command)
    .pop()
    .trim()
}

export function toDay() {
  return moment().format('YYYY/MM/DD')
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
