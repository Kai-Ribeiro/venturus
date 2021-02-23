import React from 'react';
import Card from 'reactstrap/lib/Card';
import CardTitle from 'reactstrap/lib/CardTitle';
import CardBody from 'reactstrap/lib/CardBody';
import Button from 'reactstrap/lib/Button';

export default function Home() {

  return (
    <>
      <div className="d-flex space">
        <div className="mr-5">
          <Card className="card_pos">
            <CardBody>
              <div className="d-flex justify-content-between mb-2">
                <CardTitle tag="h4" className="title">My Teams</CardTitle>
                <div>
                  <Button className="icon btn-1"><i className="fas fa-plus"></i></Button>
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
                  <tr>
                    <td>Barcelona</td>
                    <td>Barcelona Squad</td>
                  </tr>
                  <tr>
                    <td>Real Madrid</td>
                    <td>Real Madrid Squad</td>
                  </tr>
                  <tr>
                    <td>Milan</td>
                    <td>Milan Squad</td>
                  </tr>
                  <tr>
                    <td>Liverpool</td>
                    <td>Liverpool Squad</td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
        <div>
          <div>
            <Card className="mb-5">
              <CardBody>
                <CardTitle tag="h4" className="title">Top 5</CardTitle>
              </CardBody>
            </Card>
          </div>
          <div>
            <Card>
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
