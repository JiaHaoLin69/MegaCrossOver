import React from 'react';
import Header from '../main/header';
import MainContent from '../content/maincontent';
import { cardData, galleryData } from '../../data';

const Home: React.FC = () => {
    // Links del sidebar
    const asideLinks = [
        { id: 1, text: 'Wiki Oficial de Watanare', url: 'https://watanare.fandom.com/wiki/Watanare_Wiki' },
        { id: 2, text: 'Ver Anime en Crunchyroll', url: 'https://crunchyroll.com' },
        { id: 3, text: 'Leer Novela Ligera', url: '#' },
    ];

    return (
        <div className="fade-in">
            <Header title="Watashi Ga Koibito ni nareru" subtitle="¿¡No hay manera de que pueda tener un amante!?" />
            <MainContent
                cardsData={cardData.map(char => ({
                    id: char.id,
                    title: char.title,
                    text: char.shortText,
                    imgSrc: char.imgSrc,
                    variant: char.variant,
                    buttonLabel: 'Ver Detalles'
                }))}
                galleryData={galleryData}
                asideLinks={asideLinks}
            />
        </div>
    );
};

export default Home;