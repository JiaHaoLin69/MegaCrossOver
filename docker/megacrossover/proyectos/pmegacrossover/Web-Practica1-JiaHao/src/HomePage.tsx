import React from 'react';
import { useOutletContext } from 'react-router-dom';


import MainContent from './componentes/content/maincontent'; 
import type { CardProps } from './componentes/content/bootstrap';
import type { GalleryItem } from './componentes/content/galeria';

type HomeContextType = {
  cardData: CardProps[];
  galleryData: GalleryItem[];
};

const HomePage: React.FC = () => {
  const { cardData, galleryData } = useOutletContext<HomeContextType>();

  return (
    <MainContent 
      cardsData={cardData}
      galleryData={galleryData} asideLinks={[]}    />
  );
};

export default HomePage;