import React, { useState, useMemo } from 'react';
import { Container, Pagination, Button } from 'react-bootstrap';
import { allGalleryImages } from '../../data';
import { MdClose } from 'react-icons/md';
import './full-gallery.css'; // Asegúrate de tener este CSS (ver abajo)

const ITEMS_PER_PAGE = 12;

const FullGallery: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('todos');

  // Lógica de filtrado
  const filteredImages = useMemo(() => {
    if (filter === 'todos') return allGalleryImages;
    return allGalleryImages.filter(img => img.category === filter);
  }, [filter]);

  // Paginación
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentImages = filteredImages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container className="mt-5 pt-5 mb-5 fade-in">
      <div className="text-center mb-4 glass-widget p-4" style={{ display: 'inline-block', width: '100%' }}>
        <h2 className="display-5 fw-bold text-primary-gradient">Colección de Arte</h2>
        <p className="text-muted">Explorando {filteredImages.length} recuerdos</p>

        {/* BOTONES DE FILTRO CON TU ESTILO */}
        <div className="d-flex justify-content-center flex-wrap gap-2 mt-3">
          <Button
            variant={filter === 'todos' ? 'light' : 'outline-light'}
            onClick={() => handleFilterChange('todos')}
            className="rounded-pill fw-bold"
          >Todos</Button>

          <Button
            className={filter === 'renako' ? 'btn-renako' : 'btn-outline-renako'}
            onClick={() => handleFilterChange('renako')}
            style={{ borderRadius: '50px' }}
          >Renako</Button>

          <Button
            className={filter === 'mai' ? 'btn-mai' : 'btn-outline-mai'}
            onClick={() => handleFilterChange('mai')}
            style={{ borderRadius: '50px' }}
          >Mai</Button>

          <Button
            className={filter === 'ajisai' ? 'btn-ajisai' : 'btn-outline-ajisai'}
            onClick={() => handleFilterChange('ajisai')}
            style={{ borderRadius: '50px' }}
          >Ajisai</Button>
        </div>
      </div>

      {/* Grid de Imágenes */}
      <div className="gallery-grid mt-4">
        {currentImages.map((img) => (
          <div key={img.id} className="gallery-item glass-widget" onClick={() => setSelectedImg(img.url)}>
            <img src={img.url} alt={img.alt} className="gallery-img" loading="lazy" />
            <div className="gallery-overlay">
              <span className="badge bg-dark backdrop-blur">Ver Full HD</span>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4 glass-widget p-2 d-inline-flex mx-auto w-100 justify-content-center">
          <Pagination className="m-0">
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      )}

      {/* Lightbox */}
      {selectedImg && (
        <div className="lightbox-overlay" onClick={() => setSelectedImg(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedImg(null)}><MdClose /></button>
            <img src={selectedImg} alt="Full" className="lightbox-img" />
          </div>
        </div>
      )}
    </Container>
  );
};

export default FullGallery;