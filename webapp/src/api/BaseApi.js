import axios from 'axios';

export default class BaseApi {

  static axios = axios.create({
    baseURL: 'https://api-football-v1.p.rapidapi.com',
    headers: {
      'x-rapidapi-key': 'ae1ba06bb5msh8bd3fd8e3760f9fp1418a9jsndc376229c9a5',
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  });

}
