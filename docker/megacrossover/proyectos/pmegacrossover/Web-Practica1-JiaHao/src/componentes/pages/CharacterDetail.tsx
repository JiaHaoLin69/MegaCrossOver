import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Container, Row, Col, Button, Tabs, Tab, ProgressBar } from 'react-bootstrap';
import { cardData } from '../../data';
import { MdArrowBack, MdFavorite } from 'react-icons/md';
import { usePersistentVote } from '../../hooks/usePersistentVote';

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id || 0);
  // Conversión segura de ID
  const character = cardData.find(c => c.id === numericId);

  // Estado de Votos
  const { votes, incrementVote } = usePersistentVote(numericId || 'unknown');

  if (!character) return <Navigate to="/404" replace />;

  return (
    <Container className="mt-5 pt-5 fade-in">
      {/* TU BOTÓN PERSONALIZADO */}
      <Link to="/" className="text-decoration-none">
        <div className="btn-back-watanare mb-4">
          <MdArrowBack />
          <span className="gradient-text">VOLVER</span>
        </div>
      </Link>

      {/* USAMOS TU CLASE .glass-widget */}
      <Row className="glass-widget p-4 mb-5 mx-0 align-items-start">
        <Col lg={4} className="text-center mb-4 mb-lg-0">
          <div className="position-relative d-inline-block">
            <img
              src={character.imgSrc}
              alt={character.title}
              className="img-fluid rounded-circle shadow-lg mb-3"
              // Borde dinámico usando tus variables CSS
              style={{ width: '250px', height: '250px', objectFit: 'cover', border: `5px solid var(--color-${character.variant})` }}
            />
          </div>

          <h2 className="fw-bold mt-2">{character.title}</h2>
          {/* Badge personalizado con tus clases bg-renako, bg-mai, etc */}
          <span className={`badge rounded-pill bg-${character.variant} mb-3 px-3 py-2 fs-6`}>
            {character.role}
          </span>

          {/* Botón de Votar usando tus estilos */}
          <Button
            className={`btn-${character.variant} w-100 mt-3 py-2 fw-bold rounded-pill border-0`}
            onClick={incrementVote}
          >
            <MdFavorite className="me-2" /> ¡Dar amor! ({votes})
          </Button>
        </Col>

        <Col lg={8}>
          {/* Tabs de Bootstrap pero dentro de tu glass widget */}
          <Tabs defaultActiveKey="bio" id="char-tabs" className="mb-3 custom-tabs" fill>
            <Tab eventKey="bio" title="Biografía">
              <div className="p-2">
                <h4 className={`text-${character.variant} fw-bold mb-3`}>Historia</h4>
                <p className="lead fs-6" style={{ lineHeight: '1.8', opacity: 0.9 }}>
                  {character.fullDescription}
                </p>

                <Row className="mt-4 g-3">
                  <Col sm={6}>
                    <div className="p-3 rounded" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)' }}>
                      <small className="text-muted text-uppercase fw-bold">Cumpleaños</small>
                      <p className="fw-bold mb-0 fs-5">{character.birthday}</p>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="p-3 rounded" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)' }}>
                      <small className="text-muted text-uppercase fw-bold">Gustos</small>
                      <div className="d-flex gap-2 flex-wrap mt-1">
                        {character.likes.map(l => (
                          <span key={l} className={`badge border border-${character.variant} text-${character.variant} bg-transparent`}>
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Tab>

            <Tab eventKey="stats" title="Estadísticas">
              <div className="p-3">
                <label className="fw-bold mb-1">Carisma Social</label>
                {/* Barras de progreso con colores manuales para que coincidan con tu tema */}
                <ProgressBar
                  now={85}
                  className="mb-3"
                  style={{ height: '20px', backgroundColor: 'rgba(0,0,0,0.1)' }}
                >
                  <ProgressBar now={85} style={{ backgroundColor: `var(--color-${character.variant})` }} label="85%" />
                </ProgressBar>

                <label className="fw-bold mb-1">Nivel de Celos</label>
                <ProgressBar
                  now={character.variant === 'mai' ? 99 : 30}
                  className="mb-3"
                  style={{ height: '20px', backgroundColor: 'rgba(0,0,0,0.1)' }}
                >
                  <ProgressBar now={character.variant === 'mai' ? 99 : 30} variant="warning" label={character.variant === 'mai' ? '99%' : '30%'} />
                </ProgressBar>
              </div>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default CharacterDetail;