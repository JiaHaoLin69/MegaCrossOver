import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { cardData } from '../../data'; // Importamos los datos
import { MdArrowBack } from 'react-icons/md';

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtenemos el ID de la URL
  
  // Buscamos el personaje en nuestro array de datos
  const character = cardData.find(c => c.id === Number(id));

  // Si no existe el personaje (ej: /personaje/999), redirigimos a 404
  if (!character) {
      return <Navigate to="/404" replace />;
  }

  return (
    <Container className="mt-5 pt-5 fade-in">
      <Link to="/" className="text-decoration-none">
          <Button variant="outline-secondary" className="mb-4 rounded-pill">
              <MdArrowBack /> Volver
          </Button>
      </Link>

      <Row className="align-items-center glass-widget p-5">
        <Col md={5}>
          <img 
            src={character.imgSrc} 
            alt={character.title} 
            className="img-fluid rounded shadow-lg" 
            style={{ border: `4px solid var(--primary-pink)` }}
          />
        </Col>
        <Col md={7}>
          <Badge bg={character.variant} className="mb-2">ID: {character.id}</Badge>
          <h1 className="display-4 fw-bold mb-3">{character.title}</h1>
          <p className="lead text-muted">{character.text}</p>
          <hr />
          <h4 className="fw-bold mt-4">Descripción Completa</h4>
          <p style={{ lineHeight: '1.8' }}>
              {character.fullDescription || "No hay descripción adicional disponible para este personaje."}
          </p>
          
          <div className="mt-4">
              <Button variant={character.variant} size="lg" className="rounded-pill px-4 me-2">
                  Votar por {character.title.split(' ')[0]}
              </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CharacterDetail;