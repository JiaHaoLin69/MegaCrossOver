import React, { useState } from 'react';
import { Container, Pagination } from 'react-bootstrap';
import { allGalleryImages } from '../../data';
import { MdClose } from 'react-icons/md'; // Importamos icono de cerrar
import './full-gallery.css';

const ITEMS_PER_PAGE = 25;

const FullGallery: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // NUEVO: Estado para controlar la imagen seleccionada (Lightbox)
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // Lógica de paginación existente
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentImages = allGalleryImages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allGalleryImages.length / ITEMS_PER_PAGE);

  const paginate = (pageNumber: number) => {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Funciones para abrir/cerrar imagen
  const openLightbox = (url: string) => {
      setSelectedImg(url);
      document.body.style.overflow = 'hidden'; // Bloquea el scroll de la web
  };

  const closeLightbox = () => {
      setSelectedImg(null);
      document.body.style.overflow = 'auto'; // Reactiva el scroll
  };

  return (
    <Container className="mt-5 pt-5 mb-5 fade-in">
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold text-primary-gradient">Galería Completa</h2>
        <p className="text-muted">Explora nuestra colección de arte (Página {currentPage} de {totalPages})</p>
      </div>

      {/* Grid de Imágenes */}
      <div className="gallery-grid">
        {currentImages.map((img) => (
          <div 
            key={img.id} 
            className="gallery-item"
            onClick={() => openLightbox(img.url)} // <-- AHORA ES CLICKEABLE
          >
            <img 
                src={img.url} 
                alt={img.alt} 
                className="gallery-img"
                loading="lazy" 
            />
            <div className="gallery-overlay">
                <span>🔍 Ver Completa</span>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación (Sin cambios) */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination size="lg">
            <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
            
            {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item 
                    key={index + 1} 
                    active={index + 1 === currentPage} 
                    onClick={() => paginate(index + 1)}
                >
                    {index + 1}
                </Pagination.Item>
            ))}

            <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>
        </div>
      )}

      {/* --- NUEVO: VISOR A PANTALLA COMPLETA (MODAL) --- */}
      {selectedImg && (
          <div className="lightbox-overlay" onClick={closeLightbox}>
              <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                  <button className="lightbox-close" onClick={closeLightbox}>
                      <MdClose />
                  </button>
                  <img src={selectedImg} alt="Vista completa" className="lightbox-img" />
              </div>
          </div>
      )}

    </Container>
  );
};

export default FullGallery;