import React, { useState } from 'react';
import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import CardContainer from './container';
import Gallery, { type GalleryItem } from './galeria';
import YouTubeVideo from '../aside/video';
import type { CardProps } from './bootstrap';
import { sendNewsletterSubscription } from '../../services/newsletter';

// Definimos el tipo para los enlaces del aside
export interface AsideLinkItem {
  id: number;
  text: string;
  url: string;
}

interface MainContentProps {
  cardsData: CardProps[];
  galleryData: GalleryItem[];
  asideLinks: AsideLinkItem[]; // Nueva prop
}

const MainContent: React.FC<MainContentProps> = ({ cardsData, galleryData, asideLinks }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value.trim());

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setStatus('error');
      setMessage('Por favor ingresa un correo válido.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      await sendNewsletterSubscription(email, {
        subject: '¡Nueva suscripción al Club MegaCrossOver!',
        messageTemplate:
          '¡Gracias por suscribirte a MegaCrossOver! Pronto recibirás nuestras novedades en {email}.',
      });
      setStatus('success');
      setMessage('¡Gracias por unirte! Revisa tu bandeja para confirmar tu suscripción.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('No pudimos procesar tu solicitud. Inténtalo nuevamente en unos instantes.');
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <Row className="g-5">
        
        {/* COLUMNA PRINCIPAL (Contenido) */}
        <Col lg={8}>
          <section id="main-section">
            <CardContainer cardsData={cardsData} />
            <div className="mt-5">
                <Gallery photos={galleryData} />
            </div>
          </section>
        </Col>

        {/* ASIDE (Barra Lateral Completa) */}
        <Col lg={4}>
          <aside className="sticky-top" style={{ top: '100px', zIndex: 10 }}>
            
            {/* 1. SECCIÓN VIDEO */}
            <div className="glass-widget p-3 mb-4 rounded shadow-sm">
              <h5 className="fw-bold mb-3 border-bottom pb-2">🎬 Tráiler Destacado</h5>
              <YouTubeVideo embedId="tzfVzu6vYJo?si=8aFuqRGbnTCyu7_Z" /> 
              <p className="--text-main small mt-2 fst-italic">
                Descubre las últimas novedades de la temporada.
              </p>
            </div>
            
            
            {/* 2. SECCIÓN ENLACES DE INTERÉS (Editable desde App.tsx) */}
            <div className="glass-widget p-4 mb-4 rounded shadow-sm">
              <h5 className="fw-bold mb-3 border-bottom pb-2">🔗 Enlaces Recomendados</h5>
              <ListGroup variant="flush">
                {asideLinks.map((link) => (
                  <ListGroup.Item 
                    key={link.id} 
                    action 
                    href={link.url} 
                    target="_blank"
                    className="bg-transparent border-0 ps-0 text-primary fw-medium"
                  >
                    ➜ {link.text}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>

            {/* 3. SECCIÓN ÚNETE AL CLUB */}
            <div className="glass-widget p-4 rounded shadow-sm bg-primary text-white text-center gradient-bg">
                <h4 className="fw-bold">💌 Únete al Club</h4>
                <p className="small mb-3">
                  Recibe noticias exclusivas, sorteos y contenido especial del MegaCrossOver directamente en tu correo.
                </p>
                <Form onSubmit={handleSubmit} className="text-start">
                  <Form.Group controlId="newsletterEmail" className="mb-3">
                    <Form.Label className="text-white">Correo electrónico</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="tuemail@ejemplo.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      isInvalid={status === 'error' && !isValidEmail(email)}
                      disabled={status === 'loading'}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingresa un correo electrónico válido.
                    </Form.Control.Feedback>
                    <Form.Text className="text-white-50">
                      Solo usaremos tu correo para enviarte novedades del club.
                    </Form.Text>
                  </Form.Group>
                  <div className="d-grid gap-2">
                    <Button
                      type="submit"
                      variant="light"
                      className="rounded-pill fw-bold shadow-sm"
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? 'Enviando...' : '¡Suscribirme ahora!'}
                    </Button>
                  </div>
                </Form>
                {status !== 'idle' && message && (
                  <div
                    className={`mt-3 small fw-semibold ${status === 'success' ? 'text-success' : 'text-warning'}`}
                    role="status"
                  >
                    {message}
                  </div>
                )}
            </div>

          </aside>
        </Col>
      </Row>
    </Container>
  );
};

export default MainContent;
