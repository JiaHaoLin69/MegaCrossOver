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
import Shop from './componentes/pages/Shop';
import CartDrawer from './componentes/shop/CartDrawer';
import NotFound from './componentes/pages/NotFound';

// Iconos
import { MdHome, MdStar, MdImage, MdEmail } from 'react-icons/md';
import { FaTiktok, FaReddit } from 'react-icons/fa';

// Datos de navegación


const socialLinks = [
  { id: 1, Icon: FaTiktok, href: 'https://tiktok.com/@jiahaolin69', label: 'TikTok' },
  { id: 2, Icon: FaReddit, href: 'https://www.reddit.com/user/Apprehensive-Fly-109/', label: 'Reddit' },
  { id: 3, Icon: MdEmail, href: 'mailto:jiahaolinyt@gmail.com', label: 'Email' },
];

const App = () => {
  // Inicialización de tema: Guardado en localStorage o preferencia del sistema
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;

    // Si no hay nada guardado, detectamos preferencia del sistema operativo
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    // Guardamos en localStorage para persistencia
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Lógica del Carrito (Simulación Comercial)
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product: any) => {
    setCart([...cart, product]);
    setShowCart(true); // Abrir carrito al añadir
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item, index) => item.id !== productId || index !== cart.findIndex(i => i.id === productId)));
  };

  const toggleCart = () => setShowCart(!showCart);

  // Datos de navegación actualizados
  const navLinksData: NavLinkItem[] = [
    { id: 1, label: 'Inicio', href: '/', Icon: MdHome },
    { id: 2, label: 'Tienda', href: '/tienda', Icon: MdStar }, // Nuevo enlace
    { id: 3, label: 'Wiki', href: '/personajes', Icon: MdStar },
    { id: 4, label: 'Galería', href: '/galeria', Icon: MdImage },
  ];

  return (
    <div className="App">
      <NavBar
        links={navLinksData}
        brandName="MEGACROSSOVER"
        currentTheme={theme}
        toggleTheme={toggleTheme}
        cartCount={cart.length}
        onOpenCart={toggleCart}
      />

      <CartDrawer
        show={showCart}
        onClose={() => setShowCart(false)}
        cartItems={cart}
        onRemove={removeFromCart}
      />

      <div style={{ minHeight: '80vh', paddingTop: '80px' }}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="tienda" element={<Shop onAddToCart={addToCart} />} />
          <Route path="personajes" element={<CharacterList />} />
          <Route path="personaje/:id" element={<CharacterDetail />} />
          <Route path="galeria" element={<FullGallery />} />
          <Route path="chat" element={<ChatMode />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer iesName="Diseñado por JiaHao" socialLinks={socialLinks} />
    </div>
  );
};

export default App;