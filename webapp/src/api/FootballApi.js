import BaseApi from './BaseApi';

export default class FootBallApi extends BaseApi {

  static async fetchAllPlayers(attributes = {}) {
    if (attributes.length < 5) {
      return [];
    };
    const response = await this.axios.get(`/v2/players/search/${attributes}`);

    return response.data.api.players;
  }
}
