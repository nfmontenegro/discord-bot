import moment from 'moment'
import libs from '../libs'

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

export function requestLib(command) {
  let lib

  const {bip, weather, rut, wikipedia, kiosko, giphy, translate, youtube} = libs

  switch (command) {
    case '!translate':
      lib = translate
      break
    case '!wikipedia':
      lib = wikipedia
      break
    case '!bip':
      lib = bip
      break
    case '!diario':
      lib = kiosko
      break
    case '!clima':
      lib = weather
      break
    case '!gif':
      lib = giphy
      break
    case '!rut':
      lib = rut
      break
    case '!youtube':
      lib = youtube
      break
  }

  return lib
}
