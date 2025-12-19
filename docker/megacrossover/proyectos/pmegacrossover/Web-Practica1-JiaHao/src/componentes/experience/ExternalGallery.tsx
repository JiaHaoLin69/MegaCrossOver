import React, { useMemo, useState } from 'react';
import { Badge, Button, Col, Form, Row } from 'react-bootstrap';
import { MdAutoAwesome, MdCloudDownload, MdFilterList } from 'react-icons/md';
import { useExternalGallery } from '../../hooks/useExternalGallery';

const ExternalGallery: React.FC = () => {
  const { images, status } = useExternalGallery();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return images.filter((img) => {
      const q = query.toLowerCase();
      return img.title.toLowerCase().includes(q) || (img.character?.toLowerCase().includes(q) ?? false);
    });
  }, [images, query]);

  return (
    <section className="glass-widget interactive p-4 mt-5" id="galeria-viva">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
        <div>
          <p className="small text-uppercase text-muted mb-1">Galería importada</p>
          <h2 className="h3 m-0 text-primary-gradient">Arte externo en streaming</h2>
        </div>
        <Badge bg={status === 'ready' ? 'info' : status === 'error' ? 'danger' : 'warning'} className="px-3 py-2">
          {status === 'ready' && 'Colección remota online'}
          {status === 'loading' && 'Conectando con portales...'}
          {status === 'error' && 'Modo respaldo offline'}
        </Badge>
      </div>

      <Row className="align-items-center g-3 mb-3">
        <Col xs={12} md={6} className="d-flex align-items-center gap-2">
          <MdFilterList className="text-primary" size={24} />
          <Form.Control
            type="search"
            placeholder="Buscar personaje, título o artista externo"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="bg-dark-subtle border-0 text-light"
          />
        </Col>
        <Col xs={12} md={6} className="text-md-end">
          <Button variant="outline-light" className="rounded-pill d-inline-flex align-items-center gap-2">
            <MdCloudDownload /> Guardar selección
          </Button>
        </Col>
      </Row>

      <div className="external-gallery-grid mt-3">
        {filtered.map((img) => (
          <div key={img.id} className="external-gallery-item">
            <div className="external-gallery-thumb" style={{ backgroundImage: `url(${img.imageUrl})` }} />
            <div className="external-gallery-meta">
              <div className="d-flex align-items-center gap-2 mb-1">
                <MdAutoAwesome className="text-warning" />
                <span className="small text-uppercase text-white-50">{img.source}</span>
              </div>
              <h5 className="mb-0 text-white text-truncate" title={img.title}>{img.title}</h5>
              {img.character && <p className="mb-0 text-white-50 small">{img.character}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExternalGallery;
