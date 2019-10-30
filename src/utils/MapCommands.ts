import Wikipedia from '../api/Wikipedia';

const clearCommand = (command, message) => {
  return message
    .split(command)
    .pop()
    .trim();
};

//TODO: dictionary data
const mapCommands = async commandMessage => {
  if (commandMessage.startsWith('!wikipedia')) {
    const wikipedia = new Wikipedia();
    return await wikipedia.run(clearCommand('!wikipedia', commandMessage));
  }
};

export default mapCommands;
