import Wikipedia from '../api/Wikipedia';

const clearCommand = (command, message) => {
  return message
    .split(command)
    .pop()
    .trim();
};

//TODO: dictionary data
const mapCommands = commandMessage => {
  if (commandMessage.startsWith('!wikipedia')) {
    const wikipedia = new Wikipedia();
    return wikipedia.run(clearCommand('!wikipedia', commandMessage));
  } else {
    return null;
  }
};

export default mapCommands;
