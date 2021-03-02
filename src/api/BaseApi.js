import axios from 'axios';

export default class BaseApi {

  static axios = axios.create({
    baseURL: 'https://api-football-v1.p.rapidapi.com',
    headers: {
      "x-rapidapi-key": process.env.REACT_APP_KEY,
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  });

}
