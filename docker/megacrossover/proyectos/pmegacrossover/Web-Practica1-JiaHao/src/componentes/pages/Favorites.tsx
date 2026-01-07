import React from 'react';
import { Container } from 'react-bootstrap';
import CardContainer from '../content/container';
import { cardData } from '../../data';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

interface FavoritesProps {
    favorites: number[];
    toggleFavorite: (id: number) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ favorites, toggleFavorite }) => {
    const favoriteCharacters = cardData.filter(char => favorites.includes(char.id));

    return (
        <div className="fade-in">
            <Container className="mt-5 pt-5 text-center">
                <h1 className="fw-bold">Mis Favoritos</h1>
                <p className="text-muted mb-4">
                    Aquí están tus personajes favoritos guardados.
                </p>

                {favoriteCharacters.length === 0 ? (
                    <div className="text-center py-5">
                        <h3>No tienes favoritos aún 💔</h3>
                        <p>Ve a la Wiki y dale amor a tus personajes preferidos.</p>
                        <Link to="/personajes">
                            <Button variant="primary" className="rounded-pill px-4">
                                Ir a la Wiki
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <CardContainer
                        cardsData={favoriteCharacters.map((char) => ({
                            id: char.id,
                            title: char.title,
                            text: char.shortText,
                            imgSrc: char.imgSrc,
                            variant: char.variant,
                            buttonLabel: 'Ver Detalles',
                            isFavorite: true,
                            onToggleFavorite: toggleFavorite
                        }))}
                    />
                )}
            </Container>
        </div>
    );
};

export default Favorites;
