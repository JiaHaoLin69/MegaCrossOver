import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../main/header';
import MainContent from '../content/maincontent';
import { cardsData, galleryData } from '../../data';

const Home: React.FC = () => {
    // Links del sidebar
    const asideLinks = [
        { id: 1, text: 'Wiki Oficial de Watanare', url: 'https://watanare.fandom.com/wiki/Watanare_Wiki' },
        { id: 2, text: 'Ver Anime en Crunchyroll', url: 'https://crunchyroll.com' },
        { id: 3, text: 'Leer Novela Ligera', url: 'https://github.com/JiaHaoLin69/watanare.git' },
    ];

    return (
        <div className="fade-in">
            <Header title="MegaCrossOver" subtitle="Proyecto de Práctica Desplegable" />

            {/* Sección Promocional Tienda */}
            <Container className="my-4">
                <div className="p-5 text-center rounded-3 glass-panel shadow-sm position-relative overflow-hidden">
                    <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'var(--primary-pink)', filter: 'blur(60px)', opacity: 0.3, borderRadius: '50%' }}></div>
                    <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '150px', height: '150px', background: 'var(--accent-purple)', filter: 'blur(60px)', opacity: 0.3, borderRadius: '50%' }}></div>

                    <h2 className="display-5 fw-bold gradient-text mb-3">Tienda</h2>
                    <p className="fs-5 text-muted mb-4">Tienda de pruebas</p>
                    <Link to="/tienda">
                        <Button variant="primary" size="lg" className="rounded-pill shadow px-5 fw-bold gradient-bg border-0">
                            Explorar Tienda
                        </Button>
                    </Link>
                </div>
            </Container>

            <MainContent
                cardsData={cardsData.map(char => ({
                    id: char.id,
                    title: char.name,
                    text: char.description,
                    imgSrc: char.image,
                    variant: 'primary',
                    buttonLabel: 'Ver Detalles'
                }))}
                galleryData={galleryData}
                asideLinks={asideLinks}
            />
        </div>
    );
};

export default Home;