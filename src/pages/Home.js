import React, { useEffect, useState } from 'react';
import Card from 'reactstrap/lib/Card';
import CardTitle from 'reactstrap/lib/CardTitle';
import CardBody from 'reactstrap/lib/CardBody';
import { Link } from 'react-router-dom';
import TeamApi from '../api/TeamApi';

export default function Home() {
  const [ teams, setTeams ] = useState([]);

  useEffect(() => {
    setTeams(TeamApi.fetchAllTeams())
  }, []);

  const renderTeams = (data, index) => {
    const actionButton = () => {
      return (
        <div>
          <Link to={`/create/${ data.id }`}>
            <i style={{color: '#b13d7c'}} className="fas fa-pen mr-3"/>
          </Link>
          <i style={{color: '#b13d7c'}} className="fas fa-trash"/>
        </div>
      )
    };
    return (
      <tr key={ `${ index }` }>
        <td>{ data.TeamName }</td>
        <td className="d-flex justify-content-between">{ data.Description } { actionButton() } </td>
      </tr>
    )
  };

  return (
    <>
      <div className="d-flex space">
        <div className="mr-5">
          <Card className="card_pos card-style">
            <CardBody>
              <div className="d-flex justify-content-between mb-2">
                <CardTitle tag="h4" className="title">My Teams</CardTitle>
                <div>
                  <Link to="/create" className="btn btn-1"><i className="fas fa-plus"></i></Link>
                </div>
              </div>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  { teams.map(renderTeams) }
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
        <div>
          <div>
            <Card className="mb-5 card-style">
              <CardBody>
                <CardTitle tag="h4" className="title">Top 5</CardTitle>
              </CardBody>
            </Card>
          </div>
          <div>
            <Card className="card-style">
              <CardBody>
                <CardTitle tag="h2"></CardTitle>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
