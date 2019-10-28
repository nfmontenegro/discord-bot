const mapCommands = command => {
  if (command.startsWith('!ping')) {
    return 'pong!!';
  } else {
    return null;
  }
};

export default mapCommands;
