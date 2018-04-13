export const cleanCommand = (command, message) => {
  return message
    .split(command)
    .pop()
    .trim()
}
