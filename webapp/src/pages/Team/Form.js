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
import Board from '../../components/Board'
import CardDnD from '../../components/CardDnD';

export default function TeamForm() {
  const [ players, setPlayers ] = useState([]);
  const [ filteredPlayers, setFilteredPlayers ] = useState([]);
  const [ search, setSearch ] = useState("");

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

return (
    <>
      <div className="mr-5">
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
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Description</Label>
                    <Input 
                      name="Description"
                      id="description"
                      style={{height: 200}}
                      
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
                              name="radio1"
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
                              name="radio2"
                            />
                            Fantasy
                          </Label>
                        </FormGroup>
                      </Col>
                    </Row>
                  </FormGroup>
                </div>
                
                <div id="tags">
                  <FormGroup>
                    <Label for="tags">Tags</Label>
                    <Input>magenta</Input>
                  </FormGroup>
                </div>
              </div>
            </div>
            <CardSubtitle tag="h5" className="center mb-5 text-muted">CONFIGURE SQUAD</CardSubtitle>
            <div className="d-flex space team-info">
              <div>
                <FormGroup className="mb-2">
                  <Label for="Formation">Formation</Label>
                  <Input 
                    name="Formation"
                    id="formation"
                  />
                  </FormGroup>
                  <div className="d-flex justify-content-between team-formation">
                    <div>
                      <Board className="board"><i className="icon-color fas fa-plus"></i></Board>
                    </div>
                    <div>
                      <Board className="board"><i className="icon-color fas fa-plus"></i></Board>
                    </div>
                    <div>
                      <Board className="board"><i className="icon-color fas fa-plus"></i></Board>
                    </div>
                  </div>

                <Button>Save</Button>
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
                          <CardDnD id={`card-${ index }`} className="card-filter" draggable="true">
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
