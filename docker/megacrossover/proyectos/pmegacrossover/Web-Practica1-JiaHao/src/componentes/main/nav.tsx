import React from 'react';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { IconType } from 'react-icons';
import { MdWbSunny, MdDarkMode, MdShoppingCart } from 'react-icons/md'; // Iconos Sol y Luna y Carrito
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
  cartCount: number;
  onOpenCart: () => void;
}

const NavBar: React.FC<NavbarProps> = ({ links, brandName, currentTheme, toggleTheme, cartCount, onOpenCart }) => {
  return (
    <Navbar expand="lg" fixed="top" className="navbar-custom">
      <Container>

        {/* Marca / Logo */}
        <Navbar.Brand as={Link} to="/" className="brand-button me-4">
          {brandName}
        </Navbar.Brand>

        {/* Botón Carrito MÓVIL (visible solo en xs) */}
        <div className="d-lg-none ms-auto me-2">
          <Button variant="link" className="position-relative text-decoration-none" onClick={onOpenCart}>
            <MdShoppingCart size={24} style={{ color: 'var(--text-main)' }} />
            {cartCount > 0 && (
              <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                {cartCount}
              </Badge>
            )}
          </Button>
        </div>

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

            <div className="mx-2 d-none d-lg-block" style={{ borderLeft: '1px solid var(--text-muted)', height: '20px', opacity: 0.3 }}></div>

            {/* BOTÓN CARRITO DESKTOP */}
            <Button variant="link" className="position-relative text-decoration-none me-2 d-none d-lg-block" onClick={onOpenCart}>
              <MdShoppingCart size={24} style={{ color: 'var(--text-main)' }} />
              {cartCount > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* BOTÓN DE MODO NOCHE/DÍA */}
            <Button
              variant="link"
              onClick={toggleTheme}
              className="theme-toggle-btn p-1"
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