import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import type { IconType } from 'react-icons'; 
Link
import './nav.css';
import { Link } from 'react-router';
export interface NavLinkItem {
  id: number;
  label: string; 
  href: string; 
  Icon: IconType; 
}

interface NavbarProps {
  links: NavLinkItem[]; 
  brandName: string;   
}
const NavBar: React.FC<NavbarProps> = ({ links, brandName }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top"> 
      <Container>
        {}
        <Navbar.Brand href="#home">{brandName}</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto navbar-links">  
            {}
            {links.map(link => (
              <Nav.Link key={link.id} href={link.href}>
                {}
                <link.Icon className="nav-icon" /> 
                {link.label}
              </Nav.Link>
            ))}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;