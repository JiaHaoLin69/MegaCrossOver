import React from 'react';
import { Offcanvas, ListGroup, Button, Badge, Image } from 'react-bootstrap';
import { MdDelete, MdShoppingCartCheckout } from 'react-icons/md';
import type { Product } from '../../data';
import './CartDrawer.css';

interface CartDrawerProps {
    show: boolean;
    onClose: () => void;
    cartItems: Product[];
    onRemove: (productId: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ show, onClose, cartItems, onRemove }) => {

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

    const handleCheckout = () => {
        alert('¡Gracias por tu compra simulada! \n(En el futuro se aceptará waifu-coin)');
        onClose();
    };

    return (
        <Offcanvas show={show} onHide={onClose} placement="end" className="cart-drawer glass-panel" backdropClassName="glass-backdrop">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className="fw-bold">
                    🛒 Tu Carrito <Badge bg="primary" pill>{cartItems.length}</Badge>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column">
                {cartItems.length === 0 ? (
                    <div className="text-center my-auto opacity-50">
                        <h4>El carrito está vacío</h4>
                        <p>¡Ve a comprar figuritas!</p>
                    </div>
                ) : (
                    <>
                        <ListGroup variant="flush" className="flex-grow-1 overflow-auto cart-list">
                            {cartItems.map((item, index) => (
                                <ListGroup.Item key={`${item.id}-${index}`} className="d-flex align-items-center bg-transparent border-bottom border-light py-3">
                                    <Image src={item.image} rounded width={60} height={60} style={{ objectFit: 'cover' }} />
                                    <div className="ms-3 flex-grow-1">
                                        <div className="fw-bold text-truncate" style={{ maxWidth: '160px' }}>{item.name}</div>
                                        <small className="text-primary fw-bold">${item.price.toFixed(2)}</small>
                                    </div>
                                    <Button variant="link" className="text-danger p-0" onClick={() => onRemove(item.id)}>
                                        <MdDelete size={20} />
                                    </Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>

                        <div className="pt-3 border-top mt-auto">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="h5 mb-0">Total</span>
                                <span className="h4 fw-bold text-primary mb-0">${totalPrice.toFixed(2)}</span>
                            </div>
                            <Button size="lg" className="w-100 rounded-pill shadow-sm gradient-bg border-0" onClick={handleCheckout}>
                                <MdShoppingCartCheckout className="me-2" />
                                Proceder al Pago
                            </Button>
                        </div>
                    </>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default CartDrawer;
