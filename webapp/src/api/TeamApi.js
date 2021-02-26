const TEAMS_KEY = 'teams';
const persistTeams = (teams) => {
  localStorage.setItem(TEAMS_KEY, teams);
}

export default class TeamApi {
  static fetchAllTeams() {
    const teams = localStorage.getItem(TEAMS_KEY) ?? [];
    if (typeof teams === 'string') {

      return JSON.parse(teams);
    }
    return teams.map(JSON.parse);
  }

  static saveTeam(attributes = {}) {
    const teams = this.fetchAllTeams();

    const index = teams.findIndex((t) => t.TeamName === attributes.TeamName);
    if (index === -1) {
      teams.push(attributes);
    } else {
      teams[index] = attributes;
    }
    persistTeams(JSON.stringify(teams));
  }

}
