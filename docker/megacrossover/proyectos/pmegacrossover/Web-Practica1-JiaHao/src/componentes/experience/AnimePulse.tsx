import React from 'react';
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import { MdLiveTv, MdPlayArrow, MdShowChart } from 'react-icons/md';
import { useTrendingAnime } from '../../hooks/useExternalGallery';

const AnimePulse: React.FC = () => {
  const { animes, status } = useTrendingAnime();

  return (
    <section className="glass-widget interactive p-4 mt-5 anime-pulse" id="wiki-dinamica">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
        <div>
          <p className="small text-uppercase text-muted mb-1">Radar en vivo</p>
          <h2 className="h3 m-0 text-primary-gradient">Anime pulse</h2>
        </div>
        <Badge bg={status === 'ready' ? 'success' : status === 'error' ? 'danger' : 'warning'} className="px-3 py-2">
          {status === 'ready' && 'Datos en tiempo real'}
          {status === 'loading' && 'Sincronizando...'}
          {status === 'error' && 'Usando respaldo'}
        </Badge>
      </div>

      <Row className="g-3">
        {animes.map((anime, index) => (
          <Col key={anime.id} xs={12} md={6} lg={4}>
            <Card className="h-100 overflow-hidden anime-card">
              <div className="anime-card__cover" style={{ backgroundImage: `url(${anime.imageUrl})` }} />
              <Card.Body className="d-flex flex-column">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="badge bg-dark text-white rounded-pill d-inline-flex align-items-center gap-1">
                    <MdLiveTv /> Top #{index + 1}
                  </span>
                  {anime.score && (
                    <span className="badge bg-success-subtle text-success-emphasis rounded-pill d-inline-flex align-items-center gap-1">
                      <MdShowChart /> {anime.score.toFixed(1)}
                    </span>
                  )}
                </div>
                <Card.Title className="fw-bold mb-1 text-truncate" title={anime.title}>
                  {anime.title}
                </Card.Title>
                <Card.Text className="text-muted small mb-3">
                  Episodios: {anime.episodes ?? '¿Se vienen más?'}
                </Card.Text>

                <div className="progress bg-dark-subtle mb-3" style={{ height: 6 }}>
                  <div
                    className="progress-bar bg-gradient-primary"
                    role="progressbar"
                    aria-valuenow={anime.score ?? 0}
                    aria-valuemin={0}
                    aria-valuemax={10}
                    style={{ width: `${Math.min(100, Math.round((anime.score ?? 6) * 10))}%` }}
                  />
                </div>

                <div className="d-flex gap-2 mt-auto">
                  <Button
                    variant="light"
                    size="sm"
                    className="rounded-pill d-flex align-items-center gap-1"
                    href={anime.url ?? '#'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MdPlayArrow /> Ver ficha
                  </Button>
                  <Button
                    variant="outline-light"
                    size="sm"
                    className="rounded-pill text-white border-light"
                  >
                    Guardar hype
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default AnimePulse;
