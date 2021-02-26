import axios from 'axios';

export default class BaseApi {

  static axios = axios.create({
    baseURL: 'https://api-football-v1.p.rapidapi.com',
    headers: {
      "x-rapidapi-key": "a3bab72517msh97931591babadb1p1c1d19jsna4d08594c23d",
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  });

}
