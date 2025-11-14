import React from 'react';
// 1. IMPORTACIÓN DE COMPONENTES 
import Header from './componentes/main/header';
import NavBar from './componentes/main/nav';
import Footer from './componentes/main/footer';
// IMPORTACIÓN DEL CONTENEDOR 'content'
import MainContent from './componentes/content/maincontent';
// IMPORTACIÓN DE TIPOS (Interfaces) 
import type { NavLinkItem } from './componentes/main/nav';
import type { SocialLinkItem } from './componentes/social/link'; 
import type { CardProps } from './componentes/content/bootstrap';
import type { GalleryItem } from './componentes/content/galeria';
import { MdHome, MdCall, MdBuild, MdFacebook, MdEmail } from 'react-icons/md';
//  IMPORTACIÓN DE IMÁGENES (Galería) 
import img1 from './assets/images/01.jpg';
import img2 from './assets/images/03.jpg';
import img3 from './assets/images/07.jpg';
import img4 from './assets/images/06.jpeg';

//DEFINICIÓN DE DATOS PARA LOS COMPONENTES

// Datos para la Navbar
const navLinksData: NavLinkItem[] = [
  { id: 1, label: 'Inicio', href: '#inicio', Icon: MdHome },
  { id: 2, label: 'Servicios', href: '#servicios', Icon: MdBuild },
  { id: 3, label: 'Contacto', href: '#contacto', Icon: MdCall },
];

// Datos para las Cards
const cardData: CardProps[] = [
  { 
    id: 1, 
    imgSrc: 'src/assets/images/09.jpeg', 
    title: 'Sé tu mismo', 
    text: 'Que no lleg  ue una persona con pocos modales a bajartes los ánimos.', 
    buttonLabel: 'Leer Más', 
    variant: 'primary' 
  },
  { 
    id: 2, 
    imgSrc: 'src/assets/images/08.jpeg',
    title: 'Si todo sale mal entonces...', 
    text: 'Hay que ser paciente o joderse y bailar.', 
    buttonLabel: 'Ver Detalles', 
    variant: 'success'
  },
  { 
    id: 3, 
    imgSrc: 'src/assets/images/10.jpg',
    title: 'No se que poner', 
    text: 'Ante la duda no pongas nada más :D', 
    buttonLabel: 'Descubrir', 
    variant: 'warning' 
  },
];

// Datos para la Galería usando las imágenes importadas
const galleryData: GalleryItem[] = [
    { id: 1, url: img1, alt: '1º imagen' },
    { id: 2, url: img2, alt: '2º imagen' },
    { id: 3, url: img3, alt: '3º imagen' },
    { id: 4, url: img4, alt: '4º imagen' },
];

// Datos para el Footer (Redes Sociales)
const socialLinks: SocialLinkItem[] = [
    { id: 1, Icon: MdFacebook, href: 'https://facebook.com', label: 'Facebook' },
    { id: 2, Icon: MdEmail, href: 'jiahaolinyt@gmail.com', label: 'Email' },
];


// LA APP PRINCIPAL

const App: React.FC = () => {
  return (
    <div className="App">
      
      {}
      {}
      <Header 
        title="EL RINCÓN DEL OTAKU" 
        subtitle="Sé tu mismo y disfruta del viaje" 
      />
      <NavBar 
        links={navLinksData} 
        brandName="JiaHao's Site"
      />
      
      {/* Contenido principal */}
      {/* El componente MainContent recibe los datos de las cards y la galería */}
      <MainContent 
        cardsData={cardData} 
        galleryData={galleryData} 
      />

      
      <Footer 
        iesName="JiaHao IAW ASIR"
        socialLinks={socialLinks}
      />
    </div>
  );
};

export default App;