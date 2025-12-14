import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { IconType } from 'react-icons'; 
import { MdWbSunny, MdDarkMode } from 'react-icons/md'; // Iconos Sol y Luna
import './nav.css';

export interface NavLinkItem {
  id: number;
  label: string; 
  href: string; 
  Icon: IconType; 
}

interface NavbarProps {
  links: NavLinkItem[]; 
  brandName: string;
  // Nuevas props para manejar el tema
  currentTheme: string;
  toggleTheme: () => void;
}

const NavBar: React.FC<NavbarProps> = ({ links, brandName, currentTheme, toggleTheme }) => {
  return (
    <Navbar expand="lg" fixed="top" className="navbar-custom"> 
      <Container>
        
        {/* Marca a la izquierda */}
        <Navbar.Brand as={Link} to="/" className="brand-button me-4">
            {brandName}
        </Navbar.Brand>
        
        {/* Toggle para móvil */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto navbar-links align-items-center">  
            {links.map(link => (
              <Nav.Link 
                key={link.id} 
                as={Link}       
                to={link.href}
                className="d-flex align-items-center"
              >
                <link.Icon className="nav-icon" /> 
                {link.label}
              </Nav.Link>
            ))}

            {/* BOTÓN DE MODO NOCHE/DÍA */}
            <Button 
                variant="link" 
                onClick={toggleTheme} 
                className="theme-toggle-btn ms-3"
                style={{ textDecoration: 'none', color: 'var(--text-main)' }}
                aria-label="Cambiar tema"
            >
                {currentTheme === 'light' ? (
                    <MdDarkMode size={24} color="#2c3e50" title="Activar modo noche" />
                ) : (
                    <MdWbSunny size={24} color="#f39c12" title="Activar modo día" />
                )}
            </Button>

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default NavBar;