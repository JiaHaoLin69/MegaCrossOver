import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SocialLink, { type SocialLinkItem } from '../social/link';
import './footer.css'; 

export interface FooterProps {
  iesName: string;
  socialLinks: SocialLinkItem[]; 
}

const Footer: React.FC<FooterProps> = ({ iesName, socialLinks }) => {
  const currentYear = new Date().getFullYear();

  return (
    // Quitamos 'bg-dark' y 'text-white' para usar nuestras variables CSS
    <footer className="footer-container pt-5 pb-4 mt-5">
      <Container>
        <Row className="align-items-center">
          
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <h5 className="mb-3 fw-bold">Síguenos:</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              {socialLinks.map(link => (
                <SocialLink key={link.id} link={link} />
              ))}
            </div>
          </Col>

          <Col md={6} className="text-center text-md-end">
            <p className="mb-1 fw-bold">{iesName}</p>
            <p className="mb-0 small text-muted">© {currentYear} Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;