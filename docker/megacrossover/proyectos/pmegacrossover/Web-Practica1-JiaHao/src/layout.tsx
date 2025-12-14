import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar, { type NavLinkItem } from './componentes/main/nav';
import Footer from './componentes/main/footer';
import Header from './componentes/main/header';
// Importamos los iconos de Material Design (Md) y FontAwesome (Fa) para marcas
import { MdHome, MdStar, MdImage, MdEmail } from 'react-icons/md';
import { FaTiktok, FaReddit } from 'react-icons/fa'; // <--- NUEVOS ICONOS

// Datos de navegación
const navLinksData: NavLinkItem[] = [
  { id: 1, label: 'Inicio', href: '/', Icon: MdHome }, 
  { id: 2, label: 'Personajes', href: '/personajes', Icon: MdStar },
  { id: 3, label: 'Galería', href: '/galeria', Icon: MdImage },
];

// --- AQUÍ ESTÁ EL CAMBIO EN LOS SOCIAL LINKS ---
const socialLinks = [
    { id: 1, Icon: FaTiktok, href: 'https://www.tiktok.com/@jiahaolin69', label: 'TikTok' },
    { id: 2, Icon: FaReddit, href: 'https://www.reddit.com/user/Apprehensive-Fly-109/', label: 'Reddit' },
    { id: 3, Icon: MdEmail, href: 'mailto:jiahaolinyt@gmail.com', label: 'Email' },
];

const Layout: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="App">
      <NavBar 
        links={navLinksData} 
        brandName="MEGACROSSOVER" 
      />
      
      {isHomePage && (
          <Header 
            title="WATANARE" 
            subtitle="¿¡No hay manera de que pueda tener un amante!? (O tal vez sí)" 
          />
      )}

      <div style={{ minHeight: '80vh', paddingTop: isHomePage ? '0' : '100px' }}>
         <Outlet />
      </div>

      <Footer 
        iesName="Diseñado por JiaHao | Práctica React Avanzada" 
        socialLinks={socialLinks} 
      />
    </div>
  );
};

export default Layout;