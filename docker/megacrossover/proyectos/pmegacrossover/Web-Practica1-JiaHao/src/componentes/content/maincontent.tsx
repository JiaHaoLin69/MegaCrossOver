import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import CardContainer from './container'; 
import Gallery, { type GalleryItem } from './galeria'; 
import YouTubeVideo from '../aside/video'; 
import type { CardProps } from './bootstrap'; 

// Definimos el tipo para los enlaces del aside
export interface AsideLinkItem {
  id: number;
  text: string;
  url: string;
}

interface MainContentProps {
  cardsData: CardProps[];
  galleryData: GalleryItem[];
  asideLinks: AsideLinkItem[]; // Nueva prop
}

const MainContent: React.FC<MainContentProps> = ({ cardsData, galleryData, asideLinks }) => {
  return (
    <Container className="mt-5 mb-5">
      <Row className="g-5">
        
        {/* COLUMNA PRINCIPAL (Contenido) */}
        <Col lg={8}>
          <section id="main-section">
            <CardContainer cardsData={cardsData} />
            <div className="mt-5">
                <Gallery photos={galleryData} />
            </div>
          </section>
        </Col>

        {/* ASIDE (Barra Lateral Completa) */}
        <Col lg={4}>
          <aside className="sticky-top" style={{ top: '100px', zIndex: 10 }}>
            
            {/* 1. SECCIÓN VIDEO */}
            <div className="glass-widget p-3 mb-4 rounded shadow-sm">
              <h5 className="fw-bold mb-3 border-bottom pb-2">🎬 Tráiler Destacado</h5>
              <YouTubeVideo embedId="tzfVzu6vYJo?si=8aFuqRGbnTCyu7_Z" /> 
              <p className="--text-main small mt-2 fst-italic">
                Descubre las últimas novedades de la temporada.
              </p>
            </div>
            
            
            {/* 2. SECCIÓN ENLACES DE INTERÉS (Editable desde App.tsx) */}
            <div className="glass-widget p-4 mb-4 rounded shadow-sm">
              <h5 className="fw-bold mb-3 border-bottom pb-2">🔗 Enlaces Recomendados</h5>
              <ListGroup variant="flush">
                {asideLinks.map((link) => (
                  <ListGroup.Item 
                    key={link.id} 
                    action 
                    href={link.url} 
                    target="_blank"
                    className="bg-transparent border-0 ps-0 text-primary fw-medium"
                  >
                    ➜ {link.text}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>

            {/* 3. SECCIÓN ÚNETE AL CLUB */}
            <div className="glass-widget p-4 rounded shadow-sm bg-primary text-white text-center gradient-bg">
                <h4 className="fw-bold">💌 Únete al Club</h4>
                <p className="small mb-3">
                  Recibe noticias exclusivas, sorteos y contenido especial del MegaCrossOver directamente en tu correo.
                </p>
                <div className="d-grid gap-2">
                  <button className="btn btn-light rounded-pill fw-bold shadow-sm">
                    ¡Suscribirme ahora!
                  </button>
                </div>
            </div>

          </aside>
        </Col>
      </Row>
    </Container>
  );
};

export default MainContent;