import React from 'react';
import { MdPlayCircle, MdFlashOn, MdSensors, MdExplore } from 'react-icons/md';
import { Button } from 'react-bootstrap';

interface StellarHeroProps {
  onNavigateToGallery?: () => void;
  onNavigateToWiki?: () => void;
}

const stats = [
  { id: 1, label: 'Fans conectados', value: '24.3K', icon: <MdFlashOn /> },
  { id: 2, label: 'Arte sincronizado', value: '1.2K', icon: <MdSensors /> },
  { id: 3, label: 'Multiversos', value: '47', icon: <MdExplore /> },
];

const StellarHero: React.FC<StellarHeroProps> = ({ onNavigateToGallery, onNavigateToWiki }) => {
  return (
    <section className="stellar-hero">
      <div className="stellar-hero__glow" />
      <div className="stellar-hero__grid" />

      <div className="stellar-hero__content glass-widget">
        <p className="badge text-uppercase text-light fw-semibold mb-3 bg-gradient-primary">Update • Experiencia 2.0</p>
        <h1 className="display-4 fw-bold text-white mb-3">
          MegaCrossOver, reimaginado con
          <span className="text-primary-gradient"> energía interestelar</span>
        </h1>
        <p className="lead text-white-50 mb-4">
          Sumérgete en una interfaz viva con datos en tiempo real, arte importado desde portales externos y una
          experiencia pensada para que el fandom explore, comparta y descubra nuevos mundos.
        </p>

        <div className="d-flex flex-wrap gap-3 align-items-center">
          <Button
            size="lg"
            variant="light"
            className="rounded-pill shadow-sm d-flex align-items-center gap-2"
            onClick={onNavigateToGallery}
          >
            <MdPlayCircle size={24} />
            Explorar galería viva
          </Button>
          <Button
            size="lg"
            variant="outline-light"
            className="rounded-pill text-white border-light d-flex align-items-center gap-2"
            onClick={onNavigateToWiki}
          >
            <MdExplore size={22} />
            Ir a la wiki dinámica
          </Button>
        </div>

        <div className="stellar-hero__stats mt-4">
          {stats.map((stat) => (
            <div key={stat.id} className="stellar-hero__stat glass-widget interactive">
              <div className="stellar-hero__stat-icon">{stat.icon}</div>
              <div>
                <p className="m-0 text-white-50 small">{stat.label}</p>
                <p className="m-0 fw-bold text-white fs-4">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="stellar-hero__floating">
        <div className="floating-card glass-widget">
          <p className="text-white-50 small mb-1">Widget Nebula</p>
          <p className="text-white fw-bold mb-0">Detectando nuevas fuentes de arte...</p>
        </div>
        <div className="floating-card glass-widget">
          <p className="text-white-50 small mb-1">Live Sync</p>
          <p className="text-white fw-bold mb-0">Galerías externas conectadas ✅</p>
        </div>
      </div>
    </section>
  );
};

export default StellarHero;
