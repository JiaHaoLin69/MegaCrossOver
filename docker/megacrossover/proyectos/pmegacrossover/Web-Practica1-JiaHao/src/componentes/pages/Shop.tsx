import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../shop/ProductCard';
import { productsData } from '../../data';
import type { Product } from '../../data';

interface ShopProps {
    onAddToCart: (product: Product) => void;
}

const Shop: React.FC<ShopProps> = ({ onAddToCart }) => {
    return (
        <Container className="py-5 fade-in">
            <div className="text-center mb-5">
                <h1 className="fw-bold display-4 gradient-text">Tienda (Chorra)</h1>
                <p className="lead text-muted">Pruebas de funciones</p>
                <div style={{ width: '60px', height: '4px', background: 'var(--primary-pink)', margin: '0 auto', borderRadius: '2px' }}></div>
            </div>

            <Row className="g-4">
                {productsData.map(product => (
                    <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <ProductCard product={product} onAddToCart={onAddToCart} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Shop;
