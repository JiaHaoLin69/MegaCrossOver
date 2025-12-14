import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <Container className="text-center mt-5 pt-5">
      <h1 className="display-1 fw-bold text-primary" style={{ fontSize: '8rem' }}>404</h1>
      <h2 className="mb-4">¡Vaya! Te has perdido en el multiverso.</h2>
      <p className="lead mb-4">La página que buscas no existe o ha sido movida a otra dimensión.</p>
      
      <Link to="/">
        <Button variant="primary" size="lg" className="rounded-pill px-5 shadow">
            Volver a Casa
        </Button>
      </Link>
    </Container>
  );
};

export default NotFound;