import React from 'react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';


export default function Header() {
  return (
    // Bootstrap navbar
    <Navbar bg="dark" variant="dark">
      <Container className="my-3">
        
        {/* Brand Name which routes to home page */}
        <Link to="/">
          <Navbar.Brand style={{fontSize: 25 + 'px'}}>Azent</Navbar.Brand>
        </Link>

        {/* Link to add a new university */}
        <Nav className="justify-content-end">          
          <Link to="/uni/add">Add a new University</Link>
        </Nav>

      </Container>
    </Navbar>
  )
}

