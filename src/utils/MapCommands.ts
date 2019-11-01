import Wikipedia from '../api/Wikipedia';

const clearCommand = (command, message) => {
  return message
    .split(command)
    .pop()
    .trim();
};

//TODO: dictionary data
const mapCommands = async (commandMessage: string) => {
  if (commandMessage.startsWith('!')) {
    if (commandMessage.includes('!wikipedia')) {
      const wikipedia = new Wikipedia();
      const wikipediaResponse = await wikipedia.run(clearCommand('!wikipedia', commandMessage));
      return {
        type: 'embed',
        messageData: wikipediaResponse
      };
    } else {
      return {
        type: 'message',
        messageData: "Command doesn't exist"
      };
    }
  }
};

export default mapCommands;
