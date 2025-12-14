import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importamos Link
import './bootstrap.css'; 

export interface CardProps {
  id: number;
  title: string;
  text: string;
  buttonLabel: string;
  variant: string;
  imgSrc: string;
}

const CardBootstrap: React.FC<CardProps> = ({ id, title, text, buttonLabel, variant, imgSrc }) => {
  const [votes, setVotes] = useState(0);

  const handleVote = (e: React.MouseEvent) => {
    e.preventDefault(); // Evitamos que navegue si pulsamos el botón de votar
    e.stopPropagation();
    setVotes(votes + 1);
  };

  return (
    <Card className={`text-center h-100 card-glass border-${variant}`}>
      <div className="img-wrapper">
        <Card.Img variant="top" src={imgSrc} className="card-image-top" />
        <Badge bg={variant} className="vote-badge">❤️ {votes}</Badge>
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className={`text-${variant}`}>{title}</Card.Title>
        <Card.Text className="flex-grow-1">{text}</Card.Text>
        
        <div className="mt-auto d-flex gap-2 justify-content-center">
            {/* Botón de Votar */}
            <Button variant={`outline-${variant}`} onClick={handleVote} className="rounded-pill">
                ❤️ Votar
            </Button>

            {/* Enlace a Detalle - Usamos Link de react-router */}
            <Link to={`/personaje/${id}`}>
                <Button variant={variant} className="rounded-pill text-white fw-bold">
                    {buttonLabel}
                </Button>
            </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardBootstrap;