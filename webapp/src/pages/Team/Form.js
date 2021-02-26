import React, { useEffect, useState } from 'react';
import {
  Card,
  CardTitle,
  CardBody,
  Input,
  Label,
  CardSubtitle,
  Button
} from 'reactstrap'
import Col from 'reactstrap/lib/Col';
import FormGroup from 'reactstrap/lib/FormGroup';
import Row from 'reactstrap/lib/Row';
import FootBallApi from '../../api/FootballApi';
import Board from '../../components/Board';
import CardDnD from '../../components/CardDnD';
import Select from 'react-select';
import TeamApi from '../../api/TeamApi';
import Tag from '../../components/Tag';

export default function TeamForm() {
  const [ players, setPlayers ] = useState([]);
  const [ playersPositions, setPlayersPositions ] = useState([]);
  const [ filteredPlayers, setFilteredPlayers ] = useState([]);
  const [ search, setSearch ] = useState("");
  const [ formation, setFormation ] = useState([]);
  const [ team, setTeam ] = useState({});
  const [ errors, setErrors ] = useState(
    {
      TeamName: false,
      TeamWebSite: false,
      TeamType: false,
      Description: false,
    }
  );

  useEffect(() => {
    let isCancelled = false;
    if (!search || search.length < 5) return;

    FootBallApi.fetchAllPlayers(search)
      .then((result) => {
        !isCancelled && setPlayers(result);
      })
      .catch((err) => {
        if (isCancelled) return;
      })

    return (() => isCancelled = true);

  }, [ search ]);

  useEffect(() => {
    const sortedPlayers = players?.sort((a, b) => {
      if(a.firstname < b.firstname) { return -1; }
      if(a.firstname > b.firstname) { return 1; }
      return 0;
  })
    setFilteredPlayers(
      sortedPlayers?.filter((p) =>
        p.firstname?.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [ search, players ]);

  const renderFormationRow = (formationNumber, pos) => {
    const positions = [];
    const onDrop = (e, index) => {
      const player = filteredPlayers.find((p) => (p.player_id).toString() === e.dataTransfer.getData('objectId'));
      setPlayersPositions({...playersPositions, [index]: player});
      return player;
    };

    for (let i = 0; i < formationNumber; i++) {

      positions.push(
        <div key={`row-${ i }`}>
          <Board className="board" onDrop={ (e) => onDrop(e, i) }/>
        </div>
      );
    }

    const classRow = formationNumber === 1? 'around' : 'between';

    return (
      <div key={ `position-row-${ pos }` } className={`d-flex justify-content-${ classRow } team-formation-row`}>
        { positions }
      </div>
    );
  };

  const renderFormation = (formationStr) => {
    if (formationStr.value === undefined) return;
    const formations = formationStr.value.split(' - ');

    return formations.map((formation, index) => {
      return renderFormationRow(parseInt(formation), index);
    });
  };

  const handleChange = (evt) => {
    const target = evt.target;

    if (errors[target.name]) {
      setErrors({...errors, [target.name]: false});
    }
    setTeam({
      ...team,
      [target.name]: target.value,
    });
	};

  const handleSubmit = (e) => {
    e.preventDefault();

    if (team.TeamName === undefined) {
      return setErrors({...errors, TeamName: true});
    }
    if (team.TeamWebSite === undefined) {
      return setErrors({...errors, TeamWebSite: true});
    }

    if (team.Description === undefined) {
      return setErrors({...errors, Description: true});
    }

    if (team.TeamType === undefined) {
      return setErrors({...errors, TeamType: true});
    }

    TeamApi.saveTeam({ team, playersPositions });
  };

  const selectedTags = (tags) => {
    setTeam({...team, Tags: tags});
  };

  return (
    <>
      <div>
        <Card className="card-form card-style">
          <CardBody>

            <CardTitle tag="h4" className="title">Create your team</CardTitle>
            <hr className="hr-1"/>
            <CardSubtitle tag="h5" className="center mb-5 text-muted">TEAM INFORMATION</CardSubtitle>

            <div className="d-flex space team-info">
              <div>
                <FormGroup className="mb-2">
                  <Label for="teamName">Team name</Label>
                  <Input
                    name="TeamName"
                    id="teamName"
                    type="text"
                    value={ team.TeamName ?? '' }
                    onChange={ handleChange }
                    invalid={ errors.TeamName }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input
                    name="Description"
                    id="description"
                    type="text"
                    value={ team.Description ?? '' }
                    onChange={ handleChange }
                    invalid={ errors.Description }
                  />
                </FormGroup>
              </div>
              <div>
                <div id="radios">
                  <FormGroup className="mb-4">
                    <Label>Team website</Label>
                    <Input
                      name="TeamWebSite"
                      id="teamWebSite"
                      value={ team.TeamWebSite ?? '' }
                      onChange={ handleChange }
                      invalid={ errors.TeamWebSite }
                    />
                  </FormGroup>
                  <FormGroup>
                    <legend className="col-form-label"><nobr>Team type</nobr></legend>
                    <Row>
                      <Col md="3">
                        <FormGroup check>
                          <Label check>
                            <Input
                              type="radio"
                              name="TeamType"
                              value="Real"
                              onChange={ handleChange }
                              invalid={ errors.TeamType }
                            />
                            Real
                          </Label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup check>
                          <Label check>
                            <Input
                              type="radio"
                              name="TeamType"
                              value="Fantasy"
                              onChange={ handleChange }
                              invalid={ errors.TeamType }
                            />
                            Fantasy
                          </Label>
                        </FormGroup>
                      </Col>
                    </Row>
                  </FormGroup>
                </div>

                <FormGroup>
                  <Label>Tags</Label>
                  <Tag selectedTags={ selectedTags }/>
                </FormGroup>
              </div>
            </div>
            <CardSubtitle tag="h5" className="center mb-5 text-muted">CONFIGURE SQUAD</CardSubtitle>
            <div className="d-flex space team-info">
              <div>
                <FormGroup className="mb-2 d-flex space align-items-center">
                  <Label>Formation</Label>
                  <Select
                    className="select-form"
                    defaultValue={ formation?.value? { value: formation, label: formation } : null }
                    isSearchable
                    placeholder=""
                    onChange={ (form) => setFormation(form) }
                    options={ [
                      { value: '3 - 2 - 2 - 3', label: '3 - 2 - 2 - 3' },
                      { value: '3 - 2 - 3 - 1', label: '3 - 2 - 3 - 1' },
                      { value: '3 - 5 - 2', label: '3 - 5 - 2' },
                      { value: '4 - 2 - 3 - 1', label: '4 - 2 - 3 - 1' },
                      { value: '4 - 3 - 1 - 1', label: '4 - 3 - 1 - 1' },
                      { value: '4 - 3 - 2', label: '4 - 3 - 2' },
                      { value: '4 - 4 - 2', label: '4 - 4 - 2' },
                      { value: '4 - 5 - 1', label: '4 - 5 - 1' },
                      { value: '5 - 4 - 1', label: '5 - 4 - 1' },
                    ]
                  }
                  />
                </FormGroup>
                  <div className="d-flex team-formation">
                    <div className="line"/>
                    <div className="circle justify-content-around"/>
                      { renderFormation(formation) }
                      { formation && renderFormationRow(1) }
                  </div>
                <Button
                  hidden={ !formation }
                  className="save-button"
                  onClick={ handleSubmit }
                >Save</Button>
              </div>
              <div>
                <div>
                  <FormGroup>
                    <Label for="Search">Search Players</Label>
                    <Input
                      type="text"
                      style={{marginBottom: 15}}
                      onChange={ (e) => setSearch(e.target.value) }
                    />
                    {
                      (filteredPlayers?.slice(0, 5)).map((p, index) => {
                        return (
                          <CardDnD
                            key={ `card-${ index }` } id={`card-${ index }`}
                            className="card-filter"
                            draggable="true"
                            objectId={ p.player_id }
                          >
                            <div className="d-flex justify-content-between">
                              <p><strong>Name:</strong> <span>{ p.player_name }</span></p>
                              <p><strong>Age:</strong> <span>{ p.age }</span></p>
                            </div>
                            <p><strong>Nacionality:</strong> <span>{ p.nationality }</span></p>
                          </CardDnD>
                        );
                      })
                    }
                  </FormGroup>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
