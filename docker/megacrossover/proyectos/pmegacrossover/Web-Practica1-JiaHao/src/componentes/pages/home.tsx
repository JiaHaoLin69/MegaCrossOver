import React, { useCallback } from 'react';
import Header from '../main/header';
import MainContent from '../content/maincontent';
import { cardData, galleryData } from '../../data';
import StellarHero from '../experience/StellarHero';
import AnimePulse from '../experience/AnimePulse';
import ExternalGallery from '../experience/ExternalGallery';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const asideLinks = [
        { id: 1, text: 'Wiki Oficial de Watanare', url: 'https://watanare.fandom.com/wiki/Watanare_Wiki' },
        { id: 2, text: 'Ver Anime en Crunchyroll', url: 'https://crunchyroll.com' },
        { id: 3, text: 'Leer Novela Ligera', url: '#' },
    ];

    const handleNavigateGallery = useCallback(() => navigate('/galeria'), [navigate]);
    const handleNavigateWiki = useCallback(() => navigate('/personajes'), [navigate]);

    return (
        <div className="fade-in">
            <StellarHero onNavigateToGallery={handleNavigateGallery} onNavigateToWiki={handleNavigateWiki} />
            <div className="mt-5">
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
            <AnimePulse />
            <ExternalGallery />
        </div>
    );
};

export default Home;
