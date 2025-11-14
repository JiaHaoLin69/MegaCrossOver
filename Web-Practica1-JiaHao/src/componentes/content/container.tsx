import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CardBootstrap, { type CardProps } from './bootstrap.tsx';
import './Container.css'; 
interface CardContainerProps {
  cardsData: CardProps[];
}

const CardContainer: React.FC<CardContainerProps> = ({ cardsData }) => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">LA CLAVE DE LA FELICIDAD</h2>
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