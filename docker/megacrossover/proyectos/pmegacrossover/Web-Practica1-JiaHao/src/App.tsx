import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Componentes Estructurales
import Layout from './layout';
import MainContent from './componentes/content/maincontent'; // Página Home
import CharacterDetail from './componentes/pages/CharacterDetail'; // Página Detalle
import NotFound from './componentes/pages/NotFound'; // Página 404
import FullGallery from './componentes/pages/FullGallery';

// Datos (Asegúrate de tenerlos definidos aquí o importados)
import { cardData, galleryData } from './data'; // O impórtalos de donde los tengas
import type { AsideLinkItem } from './componentes/content/maincontent';

// Datos para el Aside (Sidebar)
const asideLinks: AsideLinkItem[] = [
  { id: 1, text: 'Wiki Oficial de Watanare', url: 'https://watanare.fandom.com/wiki/Watanare_Wiki' },
  { id: 2, text: 'Ver Anime Online', url: 'https://crunchyroll.com' },
];

const App: React.FC = () => {
  return (
    <Routes>
      {/* Layout envuelve a todas las páginas */}
      <Route path="/" element={<Layout />}>
        
        {/* RUTA 1: Inicio (Home) */}
        <Route index element={
            <MainContent 
                cardsData={cardData} 
                galleryData={galleryData} 
                asideLinks={asideLinks}
            />
        } />

        {/* RUTA 2: Detalle de Personaje (Dinámica por ID) */}
        <Route path="personaje/:id" element={<CharacterDetail />} />

        {/* RUTA 3: Galería Conectada */}
        <Route path="galeria" element={<FullGallery />} />

        {/* RUTA 4: Error 404 (Cualquier otra ruta) */}
        <Route path="*" element={<NotFound />} />
        
      </Route>
    </Routes>
  );
};

export default App;