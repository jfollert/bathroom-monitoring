import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarToggler, CloseButton, Collapse, Nav, NavItem, Badge, Card, Row, Col, CardBody, CardTitle } from 'reactstrap';
import "rsuite/dist/rsuite.min.css";

function NavigationBar({ isLogged, userInfo }) {

  return (
    <Navbar expand="md" color="light" light className="pb-md-1">
      
      <Link to="/" className="navbar-brand py-0">
        {/* <img alt="USM" className="img-brand" /> */}
      </Link>
      <Collapse navbar>
        <hr className="my-1" />
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link to="/" className="nav-link">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/events" className="nav-link">Eventos</Link>
          </NavItem>
        </Nav>
      </Collapse>
      
    </Navbar>
  );
}




export default NavigationBar;