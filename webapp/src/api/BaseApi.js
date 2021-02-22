import axios from 'axios';

export default class BaseApi {

  static axios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 30000,
    withCredentials: true
  });

}
