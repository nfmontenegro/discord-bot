export const cleanCommand = (command, message) =>
  message
    .split(command)
    .pop()
    .trim()
