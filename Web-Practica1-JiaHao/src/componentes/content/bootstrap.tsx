import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './bootstrap.css'; 
export interface CardProps {
  id: number;
  title: string;
  text: string;
  buttonLabel: string;
  variant: string;
  imgSrc: string;
}

const CardBootstrap: React.FC<CardProps> = ({ title, text, buttonLabel, variant, imgSrc }) => {
  return (
    <Card className={`text-center shadow h-100 border-${variant}`}>
      {}
      {imgSrc && (
        <Card.Img 
          variant="top" 
          src={imgSrc} 
          className="card-image-top" // Clase para CSS
        />
      )}

      <Card.Body>
        <Card.Title className={`text-${variant}`}>{title}</Card.Title>
        <Card.Text>
          {text}
        </Card.Text>
        <Button variant={variant}>{buttonLabel}</Button>
      </Card.Body>
    </Card>
  );
};

export default CardBootstrap;