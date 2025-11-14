import React from 'react';
import { Container, Carousel } from 'react-bootstrap';
import './galeria.css'; 
export interface GalleryItem {
    id: number;
    url: string;
    alt: string;
}

interface GalleryProps {
    photos: GalleryItem[];
}

const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  return (
    <Container className="my-5" id="galeria">
      <h2 className="text-center mb-4">Galería</h2>
      {}
      {}
      <div className="gallery-carousel-container shadow rounded overflow-hidden">
        <Carousel>
          {}
          {photos.map((photo) => (
            <Carousel.Item key={photo.id}>
              <img
                className="d-block w-100 carousel-image" 
                src={photo.url}
                alt={photo.alt}
              />
              {}
              <Carousel.Caption>
                <h5>{photo.alt}</h5>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </Container>
  );
};

export default Gallery;