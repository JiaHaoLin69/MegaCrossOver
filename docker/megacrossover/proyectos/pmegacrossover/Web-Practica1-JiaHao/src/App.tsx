import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MdChatBubble } from 'react-icons/md';

// Componentes
import ChatMode from './componentes/pages/ChatMode';
import NavBar, { NavLinkItem } from './componentes/main/nav';
import Footer from './componentes/main/footer';
import Home from './componentes/pages/home'; // Importamos el nuevo Home
import CharacterDetail from './componentes/pages/CharacterDetail';
import CharacterList from './componentes/pages/CharacterList';
import FullGallery from './componentes/pages/FullGallery';
import NotFound from './componentes/pages/NotFound';

// Iconos
import { MdHome, MdStar, MdImage, MdEmail } from 'react-icons/md';
import { FaTiktok, FaReddit } from 'react-icons/fa';

// Datos de navegación
const navLinksData: NavLinkItem[] = [
  { id: 1, label: 'Inicio', href: '/', Icon: MdHome },
  { id: 2, label: 'Chat', href: '/chat', Icon: MdChatBubble },
  { id: 3, label: 'Wiki Personajes', href: '/personajes', Icon: MdStar },
  { id: 4, label: 'Galería', href: '/galeria', Icon: MdImage },
];

const socialLinks = [
  { id: 1, Icon: FaTiktok, href: 'https://tiktok.com', label: 'TikTok' },
  { id: 2, Icon: FaReddit, href: 'https://reddit.com', label: 'Reddit' },
  { id: 3, Icon: MdEmail, href: 'mailto:jiahao@example.com', label: 'Email' },
];

const App: React.FC = () => {
  // Lógica del tema (Dark/Light)
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      <NavBar
        links={navLinksData}
        brandName="MEGACROSSOVER"
        currentTheme={theme}
        toggleTheme={toggleTheme}
      />

      <div style={{ minHeight: '80vh', paddingTop: '80px' }}>
        <Routes>
          {/* Ruta Index carga el nuevo componente Home */}
          <Route index element={<Home />} />

          {/* Rutas dinámicas y estáticas */}
          <Route path="personajes" element={<CharacterList />} />
          <Route path="personaje/:id" element={<CharacterDetail />} />
          <Route path="galeria" element={<FullGallery />} />
          <Route path="chat" element={<ChatMode />} />
          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer iesName="Diseñado por JiaHao" socialLinks={socialLinks} />
    </div>
  );
};

export default App;