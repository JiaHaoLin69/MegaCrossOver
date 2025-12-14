import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Componentes
//import Layout from './layout';
import NavBar from './componentes/main/nav'; // Importamos NavBar directamente para envolverlo o pasarlo
import MainContent from './componentes/content/maincontent';
import CharacterDetail from './componentes/pages/CharacterDetail';
import FullGallery from './componentes/pages/FullGallery';
import NotFound from './componentes/pages/NotFound';
import Footer from './componentes/main/footer';
import Header from './componentes/main/header';

// Iconos y Datos
import { MdHome, MdStar, MdImage, MdEmail } from 'react-icons/md';
import { FaTiktok, FaReddit } from 'react-icons/fa';
import { cardData, galleryData } from './data';
import type { AsideLinkItem } from './componentes/content/maincontent';
import type { NavLinkItem } from './componentes/main/nav';

// --- DATOS ---
const navLinksData: NavLinkItem[] = [
  { id: 1, label: 'Inicio', href: '/', Icon: MdHome }, 
  { id: 2, label: 'Personajes', href: '/personajes', Icon: MdStar },
  { id: 3, label: 'Galería', href: '/galeria', Icon: MdImage },
];

const socialLinks = [
    { id: 1, Icon: FaTiktok, href: 'https://tiktok.com', label: 'TikTok' },
    { id: 2, Icon: FaReddit, href: 'https://reddit.com', label: 'Reddit' },
    { id: 3, Icon: MdEmail, href: 'mailto:jiahao@example.com', label: 'Email' },
];

const asideLinks: AsideLinkItem[] = [
  { id: 1, text: 'Wiki Oficial de Watanare', url: 'https://watanare.fandom.com/wiki/Watanare_Wiki' },
  { id: 2, text: 'Ver Anime Online', url: 'https://crunchyroll.com' },
];

const App: React.FC = () => {
  // --- LÓGICA DEL TEMA ---
  
  // 1. Estado inicial: Detecta la preferencia del sistema
  const [theme, setTheme] = useState(() => {
    // Si el usuario tiene preferencia de sistema 'dark', inicia en dark, si no, light
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  // 2. Efecto para aplicar el tema al HTML
  useEffect(() => {
    // Esto añade data-theme="dark" o "light" a la etiqueta <html>
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // 3. Función para alternar
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
        {/* Navbar Global con control de tema */}
        <NavBar 
            links={navLinksData} 
            brandName="MEGACROSSOVER" 
            currentTheme={theme}
            toggleTheme={toggleTheme}
        />

        {/* Las Rutas */}
        <div style={{ minHeight: '80vh', paddingTop: '80px' }}>
            <Routes>
                <Route index element={
                    <>
                        <Header title="Watashi Ga Koibito ni nareru" subtitle="¿¡No hay manera de que pueda tener un amante!?" />
                        <MainContent cardsData={cardData} galleryData={galleryData} asideLinks={asideLinks} />
                    </>
                } />
                
                <Route path="personaje/:id" element={<CharacterDetail />} />
                <Route path="galeria" element={<FullGallery />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>

        <Footer iesName="Diseñado por JiaHao" socialLinks={socialLinks} />
    </div>
  );
};

export default App;