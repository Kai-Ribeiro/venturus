import React from 'react';
import Logo from '../assets/logo.png';
import {
  Navbar,
  NavbarBrand,
} from 'reactstrap';
import Nav from 'reactstrap/lib/Nav';

function VNavbar() {

  return (
    <Navbar color="dark" dark expand="md" className="mb-2">
      <div className="container">
        <NavbarBrand to="#">
          <img src={Logo} alt="Venturus" height="30" className="mr-2"/>
          Squad Management Tool
        </NavbarBrand>
      </div>
      <div className="d-flex justify-content-between">
        <Nav className="align-items-center text-light mr-2" navbar><nobr>John Doe</nobr></Nav>
        <div className="avatar"><strong>JD</strong></div>
      </div>
    </Navbar>
  );
}

export default VNavbar;
