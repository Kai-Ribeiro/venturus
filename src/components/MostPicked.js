import React, { useEffect, useState } from 'react'

function MostPicked({ teams }) {
  const [ team, setTeam ] = useState([]);
  const [ mostPicked, setMostPicked ] = useState([]);

  useEffect(() => {
    const results = [];
    team.forEach((data) => {
      Object.values(data.playersPositions).forEach((row) => {
        Object.values(row).forEach((player) => {
          if (!results[player.player_name]) {
            results[player.player_name] = 0;
          }
          results[player.player_name] += 1;
        }, {});
      });
    });
    const keys = Object.keys(results);
    const data = keys.map((k) => {
      return {
        player: k, value: results[k]
      }
    });

    const sortedResults = data.sort((a, b) => a.value - b.value)
    setMostPicked(sortedResults.reverse());
  }, [ team ]);

  useEffect(() => {

    setTeam(teams || []);
  }, [ teams ]);

  const playerName = (nameString) => {
    if (!nameString) return;
    const name = nameString.split(" ");

    return name[0][0] + name[1][0];
  }

  return (
    <div className="d-flex most-picked-field">
      <div className="circle-picked"/>
      <div style={{flexDirection: 'column'}} className="d-flex align-items-center justify-content-center">
        <span style={{color: '#fff'}} className="mb-2">Most picked player</span>
        <div className="picked-player">{ playerName(mostPicked[0]?.player) }</div>
      </div>
      <div style={{flexDirection: 'column'}} className="d-flex align-items-center justify-content-center">
        <span style={{color: '#fff'}} className="mb-2">Less picked player</span>
        <div className="picked-player">{ playerName(mostPicked[mostPicked.length -1]?.player) }</div>
      </div>
    </div>
  );
}

export default MostPicked;
