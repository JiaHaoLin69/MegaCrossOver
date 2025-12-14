import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // 1. Importamos Link
import type { IconType } from 'react-icons'; 
import './nav.css';

export interface NavLinkItem {
  id: number;
  label: string; 
  href: string; // Mantenemos el nombre del campo en tus datos
  Icon: IconType; 
}

interface NavbarProps {
  links: NavLinkItem[]; 
  brandName: string;   
}

const NavBar: React.FC<NavbarProps> = ({ links, brandName }) => {
  return (
    <Navbar expand="lg" fixed="top" className="navbar-custom"> 
      <Container>
        
        {/* 2. LOGO: Usamos 'as={Link}' y 'to="/"' para ir al inicio sin recargar */}
        <Navbar.Brand as={Link} to="/" className="brand-button">
            {brandName}
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto navbar-links">  
            {links.map(link => (
              /* 3. ENLACES: Convertimos Nav.Link en un Link de Router */
              <Nav.Link 
                key={link.id} 
                as={Link}       // Se comporta como un Link de React Router
                to={link.href}  // Usa 'to' en lugar de 'href'
                className="d-flex align-items-center"
              >
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