import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { MdArrowBack, MdSmartphone } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { chatProfiles, chatScenarios, ChatNode, CharacterProfile } from '../../chat-data';
import './chat.css';

interface MessageHistory {
    text: string;
    sender: 'character' | 'user';
    id: number;
}

const ChatMode: React.FC = () => {
    const [selectedChar, setSelectedChar] = useState<CharacterProfile | null>(null);
    const [history, setHistory] = useState<MessageHistory[]>([]);
    const [currentNode, setCurrentNode] = useState<ChatNode | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [affection, setAffection] = useState(0);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll automático
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(scrollToBottom, [history, isTyping]);

    // INICIAR CHAT
    const startChat = (char: CharacterProfile) => {
        setSelectedChar(char);
        setHistory([]);
        setAffection(0);
        loadNode(char.initialNode);
    };

    // CARGAR NODO
    const loadNode = (nodeId: string) => {
        const node = chatScenarios[nodeId];
        if (!node) return;

        setIsTyping(true);

        // Simulamos tiempo de respuesta
        setTimeout(() => {
            setIsTyping(false);
            addMessage(node.text, 'character');
            setCurrentNode(node);

            if (node.nextId) {
                loadNode(node.nextId);
            }
        }, 1500);
    };

    // AÑADIR MENSAJE
    const addMessage = (text: string, sender: 'character' | 'user') => {
        setHistory(prev => [...prev, { text, sender, id: Date.now() }]);
    };

    // RESPONDER
    const handleOptionClick = (nextId: string, label: string, points: number) => {
        addMessage(label, 'user');
        setAffection(prev => prev + points);
        setCurrentNode(null);
        loadNode(nextId);
    };

    // --- RENDERIZADO: MENÚ DE SELECCIÓN ---
    if (!selectedChar) {
        return (
            <Container className="mt-5 pt-5 fade-in">
                <div className="text-center mb-5">
                    <h2 className="display-4 fw-bold gradient-text">Watanare Talk</h2>
                    <p className="text-muted" style={{ fontSize: '1.2rem' }}>Elige con quién quieres hablar ahora mismo.</p>
                </div>
                <Row className="justify-content-center">
                    {chatProfiles.map(char => (
                        <Col md={4} key={char.id} className="mb-4">
                            {/* CORRECCIÓN: Quitamos clases de bootstrap que puedan interferir y usamos glass-widget */}
                            <Card
                                className="glass-widget h-100 border-0 shadow-lg interactive"
                                onClick={() => startChat(char)}
                                style={{ cursor: 'pointer', backgroundColor: 'var(--bg-card)' }}
                            >
                                <Card.Body className="text-center p-4">
                                    <div className="position-relative d-inline-block mb-3">
                                        <img
                                            src={char.avatar}
                                            alt={char.name}
                                            className="rounded-circle"
                                            style={{ width: '100px', height: '100px', objectFit: 'cover', border: `3px solid ${char.color}` }}
                                        />
                                        <span className="status-dot" style={{ position: 'absolute', bottom: '5px', right: '5px', border: '2px solid var(--bg-card)' }}></span>
                                    </div>

                                    {/* Forzamos el color del título */}
                                    <h4 className="fw-bold mb-1" style={{ color: 'var(--text-main)' }}>{char.name}</h4>

                                    {/* Estado con color visible */}
                                    <p className="small mb-3" style={{ color: 'var(--text-muted)' }}>
                                        {char.status}
                                    </p>

                                    {/* CORRECCIÓN BOTÓN: Eliminamos 'text-dark' y usamos estilos inline para garantizar contraste */}
                                    <Button
                                        className="w-100 mt-2 fw-bold rounded-pill"
                                        style={{
                                            backgroundColor: 'transparent',
                                            border: `2px solid ${char.color}`,
                                            color: 'var(--text-main)', // Se adapta al modo noche/día
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = char.color;
                                            e.currentTarget.style.color = '#fff';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.color = 'var(--text-main)';
                                        }}
                                    >
                                        <MdSmartphone className="me-2" /> Iniciar Chat
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <div className="text-center mt-4">
                    <Link to="/" className="text-decoration-none">
                        <div className="btn-back-watanare">
                            <MdArrowBack />
                            <span>Volver al Inicio</span>
                        </div>
                    </Link>
                </div>
            </Container>
        );
    }

    // --- RENDERIZADO: CHAT ACTIVO ---
    return (
        <Container className="mt-5 pt-4 fade-in chat-container">
            {/* CABECERA */}
            <div className="chat-header d-flex align-items-center p-3">
                <Button variant="link" onClick={() => setSelectedChar(null)} className="p-0 me-3" style={{ color: 'var(--text-main)' }}>
                    <MdArrowBack size={24} />
                </Button>
                <img src={selectedChar.avatar} className="rounded-circle me-3" width="45" height="45" style={{ objectFit: 'cover', border: `2px solid ${selectedChar.color}` }} />
                <div className="flex-grow-1">
                    <h5 className="m-0 fw-bold">{selectedChar.name}</h5>
                    <small className="text-success fw-bold" style={{ fontSize: '0.8rem' }}>● En línea</small>
                </div>
                <div className="text-end">
                    <div className="badge rounded-pill bg-light text-dark border d-flex align-items-center gap-1 px-3 py-2">
                        <span style={{ color: '#e74c3c' }}>❤</span>
                        <span className="fw-bold">{affection}</span>
                    </div>
                </div>
            </div>

            {/* MENSAJES */}
            <div className="chat-body">
                {history.map((msg) => (
                    <div key={msg.id} className={`d-flex mb-3 ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                        {msg.sender === 'character' && (
                            <img src={selectedChar.avatar} className="rounded-circle me-2 align-self-end" width="30" height="30" style={{ objectFit: 'cover' }} />
                        )}
                        <div
                            className={`message-bubble ${msg.sender}`}
                            // Si es usuario, ponemos el color del personaje. Si es personaje, usa el CSS por defecto.
                            style={msg.sender === 'user' ? { background: selectedChar.color } : {}}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="d-flex mb-3 justify-content-start fade-in">
                        <img src={selectedChar.avatar} className="rounded-circle me-2 align-self-end" width="30" height="30" style={{ objectFit: 'cover' }} />
                        <div className="message-bubble character typing">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* PIE DE CHAT (OPCIONES) */}
            <div className="chat-footer p-3">
                {currentNode && currentNode.options && !isTyping ? (
                    <div className="d-grid gap-2">
                        {currentNode.options.map((opt, idx) => (
                            <Button
                                key={idx}
                                className="option-btn py-2 fw-bold text-start ps-3"
                                style={{
                                    background: 'var(--bg-surface)',
                                    color: 'var(--text-main)',
                                    border: `1px solid ${selectedChar.color}`,
                                    borderRadius: '12px'
                                }}
                                onClick={() => handleOptionClick(opt.nextId, opt.label, opt.affectionPoints)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = selectedChar.color;
                                    e.currentTarget.style.color = '#fff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'var(--bg-surface)';
                                    e.currentTarget.style.color = 'var(--text-main)';
                                }}
                            >
                                ➤ {opt.label}
                            </Button>
                        ))}
                    </div>
                ) : (
                    <div
                        className="text-center fst-italic py-2"
                        style={{
                            color: 'var(--text-main)', /* Se adapta automáticamente al tema */
                            opacity: 0.8,              /* Un poco sutil, pero legible */
                            fontWeight: '500'          /* Un poco más gordita la letra */
                        }}
                    >
                        {isTyping ? (
                            <span className="typing-text-animation">
                                {selectedChar.name} está escribiendo...
                            </span>
                        ) : (
                            "Fin de la conversación (por ahora)."
                        )}
                    </div>
                )}
            </div>
        </Container>
    );
};

export default ChatMode;