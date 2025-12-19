import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { IconType } from 'react-icons';
import { MdWbSunny, MdDarkMode } from 'react-icons/md'; // Iconos Sol y Luna
import './nav.css';

// Exportamos la interfaz para poder usarla en App.tsx
export interface NavLinkItem {
  id: number;
  label: string;
  href: string;
  Icon: IconType;
}

interface NavbarProps {
  links: NavLinkItem[];
  brandName: string;
  currentTheme: string;
  toggleTheme: () => void;
}

const NavBar: React.FC<NavbarProps> = ({ links, brandName, currentTheme, toggleTheme }) => {
  return (
    <Navbar expand="lg" fixed="top" className="navbar-custom">
      <Container>

        {/* Marca / Logo */}
        <Navbar.Brand as={Link} to="/" className="brand-button me-4">
          {brandName}
        </Navbar.Brand>

        {/* Botón hamburguesa para móvil */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto navbar-links align-items-center">

            {/* Mapeo de enlaces recibidos desde App.tsx */}
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

            {/* Separador vertical sutil */}
            <div className="mx-2 d-none d-lg-block" style={{ borderLeft: '1px solid var(--text-muted)', height: '20px', opacity: 0.3 }}></div>

            {/* BOTÓN DE MODO NOCHE/DÍA */}
            <Button
              variant="link"
              onClick={toggleTheme}
              className="theme-toggle-btn ms-2 p-1"
              style={{ textDecoration: 'none', color: 'var(--text-main)' }}
              aria-label="Cambiar tema"
            >
              {currentTheme === 'light' ? (
                <MdDarkMode size={22} color="var(--text-main)" title="Activar modo noche" />
              ) : (
                <MdWbSunny size={22} color="#f9ca24" title="Activar modo día" />
              )}
            </Button>

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default NavBar;