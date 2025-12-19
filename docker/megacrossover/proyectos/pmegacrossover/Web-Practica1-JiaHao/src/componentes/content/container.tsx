import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CardBootstrap, { type CardProps } from './bootstrap.tsx';
import './container.css'; 
interface CardContainerProps {
  cardsData: CardProps[];
}

const CardContainer: React.FC<CardContainerProps> = ({ cardsData }) => {
  return (
    <Container className="my-5">
      <div className="section-header text-center mb-4">
        <p className="eyebrow">Personajes destacados</p>
        <h2>La clave del crossover perfecto</h2>
        <p className="section-subtitle">Selecciona tu protagonista ideal y sigue su historia con un estilo editorial.</p>
      </div>
      <Row className="g-4">
        {cardsData.map((card) => (
          <Col md={4} key={card.id}>
            <CardBootstrap {...card} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CardContainer;