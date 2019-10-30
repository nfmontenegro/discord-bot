import axios from 'axios';

export default class Wikipedia {
  public async run(message: string) {
    if(!message) {
      return 'The "search" parameter must be set.';
    }
    const url = 'https://es.wikipedia.org/w/api.php?action=query&list=search&srprop=snippet&format=json&origin=*&utf8=&srsearch=';
    const queryList = await axios({url: `${url}${message}`, method: 'GET'});
    return queryList
      .data
      .query
      .search
      .map(({title, snippet}) => ({title, snippet}));
  }
}
