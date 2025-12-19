import React from 'react';
import { Container } from 'react-bootstrap';
import CardContainer from '../content/container';
import { cardData } from '../../data';

const CharacterList: React.FC = () => {
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
        }))}
      />
    </div>
  );
};

export default CharacterList;
