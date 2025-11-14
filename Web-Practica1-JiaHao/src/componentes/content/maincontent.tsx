import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CardContainer from './container'; 
import Gallery, { type GalleryItem } from './galeria'; 
import MarvelSelect from '../aside/marvel'; 
import YouTubeVideo from '../aside/video'; 
import type { CardProps } from './bootstrap'; 

interface MainContentProps {
  cardsData: CardProps[];
  galleryData: GalleryItem[];
}

const MainContent: React.FC<MainContentProps> = ({ cardsData, galleryData }) => {
  return (
    <Container className="mt-4">
      <Row>
        {}
        <Col lg={9}>
          <section id="main-section">
            {}
            <CardContainer cardsData={cardsData} />
            <Gallery photos={galleryData} />
          </section>
        </Col>

        {}
        <Col lg={3}>
          <aside className="p-3 bg-light rounded shadow-sm sticky-top" style={{ top: '20px' }}>
            <h3 className="mb-3 text-primary">Información Adicional</h3>
            
            {}
            <div className="mb-4">
              <p className="fw-bold">Héroes de Marvel (MUI Select):</p>
              <MarvelSelect /> 
            </div>
            
            {}
            <div className="mb-4">
              <p className="fw-bold">Vídeo Destacado:</p>
              <YouTubeVideo embedId="8Y_pliuNISU?si=5-RGCBCDhaXCO9hA" /> 
            </div>

          </aside>
        </Col>
      </Row>
    </Container>
  );
};

export default MainContent;