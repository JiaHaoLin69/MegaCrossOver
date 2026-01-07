import React from 'react';
import { Container } from 'react-bootstrap';
import CardContainer from '../content/container';
import { cardData } from '../../data';

interface CharacterListProps {
  favorites?: number[]; // Hacemos opcional para no romper si no se pasan, pero deberían pasarse
  toggleFavorite?: (id: number) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({ favorites = [], toggleFavorite }) => {
  return (
    <div className="fade-in">
      <Container className="mt-5 pt-5 text-center">
        <h1 className="fw-bold">Wiki de Personajes</h1>
        <p className="text-muted mb-0">
          Explora los personajes y accede a sus perfiles detallados.
        </p>
      </Container>

      <CardContainer
        cardsData={cardData.map((char) => ({
          id: char.id,
          title: char.title,
          text: char.shortText,
          imgSrc: char.imgSrc,
          variant: char.variant,
          buttonLabel: 'Ver Detalles',
          isFavorite: favorites.includes(char.id),
          onToggleFavorite: toggleFavorite
        }))}
      />
    </div>
  );
};

export default CharacterList;
