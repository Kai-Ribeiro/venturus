import React, { useEffect, useState } from 'react'

function TopFive({ teams }) {
  const [ team, setTeam ] = useState([]);
  const [ highestAge, setHighestAge ] = useState([]);
  const [ lowestAge, setLowestAge ] = useState([]);

  useEffect(() => {
    const avgData = team.map((data) => {
      let sumAge = 0;
      let count = 0;
      Object.values(data.playersPositions).forEach((row) => {
        Object.values(row).forEach((player) => {
          count += 1;
          sumAge += player.age;
        });
      });
      return { avgAge: sumAge/count, team: data.TeamName };
    });


    const low = avgData.sort((a, b) => a.avgAge - b.avgAge).slice(0, 5);
    setLowestAge([...low]);
    setHighestAge(low.reverse());

  }, [ team ]);


  useEffect(() => {

    setTeam(teams || []);
  }, [ teams ]);

  const renderAge = (data, index) => {
    return (
      <div key={ index } className="item">
        <span className="team-name">{ data.team }</span> <span className="avg">{ (data.avgAge).toFixed(1) }</span>
      </div>
    )
  }

  return (
    <div className="d-flex justify-content-between">
      <div className="top-five-container mr-4">
        <span><strong>Highest avg age</strong></span>
        <div className="container-item">{ highestAge.map(renderAge) }</div>
      </div>
      <div className="top-five-container">
        <span><strong>Lowest avg age</strong></span>
        <div className="container-item">{ lowestAge.map(renderAge) }</div>
      </div>
    </div>
  );
}

export default TopFive;
