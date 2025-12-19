import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { MdAddShoppingCart } from 'react-icons/md';
import type { Product } from '../../data';
import './ProductCard.css';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    return (
        <Card className="product-card h-100 border-0 shadow-sm glass-panel">
            <div className="product-img-wrapper position-relative overflow-hidden">
                <Card.Img variant="top" src={product.image} alt={product.name} className="product-img" />
                {product.isNew && (
                    <Badge bg="danger" className="position-absolute top-0 end-0 m-3 shadow-sm rounded-pill px-3 py-2">
                        ¡NUEVO!
                    </Badge>
                )}
            </div>
            <Card.Body className="d-flex flex-column p-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <Badge bg="light" text="dark" className="border">
                        {product.category}
                    </Badge>
                </div>
                <Card.Title className="fw-bold mb-2 text-truncate-2">{product.name}</Card.Title>
                <Card.Text className="text-muted small flex-grow-1" style={{ minHeight: '3rem' }}>
                    {product.description}
                </Card.Text>

                <div className="d-flex align-items-end justify-content-between mt-3 pt-3 border-top border-light">
                    <div>
                        <small className="text-uppercase text-muted fw-bold" style={{ fontSize: '0.7em' }}>Precio</small>
                        <h4 className="fw-bold mb-0 text-primary">${product.price.toFixed(2)}</h4>
                    </div>
                    <Button
                        variant="primary"
                        className="rounded-circle p-3 shadow-sm btn-icon-hover"
                        onClick={() => onAddToCart(product)}
                        aria-label="Añadir al carrito"
                    >
                        <MdAddShoppingCart size={22} />
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
