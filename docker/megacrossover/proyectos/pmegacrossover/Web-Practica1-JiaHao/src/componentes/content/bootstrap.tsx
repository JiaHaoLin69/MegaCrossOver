import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './bootstrap.css';
import { usePersistentVote } from '../../hooks/usePersistentVote';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export interface CardProps {
  id: number;
  title: string;
  text: string;
  buttonLabel: string;
  variant: string;
  imgSrc: string;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
}

const CardBootstrap: React.FC<CardProps> = ({
  id,
  title,
  text,
  buttonLabel,
  variant,
  imgSrc,
  isFavorite,
  onToggleFavorite
}) => {
  const { votes, incrementVote } = usePersistentVote(id);

  const handleVote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    incrementVote();
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(id);
  };

  return (
    <Card className={`text-center h-100 card-glass border-${variant}`}>
      <div className="img-wrapper">
        <Card.Img variant="top" src={imgSrc} className="card-image-top" />
        <Badge bg={variant} className="vote-badge">❤️ {votes}</Badge>
        {onToggleFavorite && (
          <div
            className="favorite-icon-wrapper"
            onClick={handleFavorite}
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              cursor: 'pointer',
              fontSize: '1.5rem',
              color: isFavorite ? '#e74c3c' : '#ccc',
              zIndex: 10,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
            }}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </div>
        )}
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className={`text-${variant}`}>{title}</Card.Title>
        <Card.Text className="flex-grow-1">{text}</Card.Text>

        <div className="mt-auto d-flex gap-2 justify-content-center">
          {/* Botón de Votar */}
          <Button variant={`outline-${variant}`} onClick={handleVote} className="rounded-pill">
            ❤️ {votes}
          </Button>

          {/* Enlace a Detalle */}
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