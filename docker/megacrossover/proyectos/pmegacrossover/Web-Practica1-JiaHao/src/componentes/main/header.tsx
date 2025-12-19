import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./header.css";

interface HeaderProps {
    title: string;
    subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
    return (
    <header className="imagen">
        <div className="contenido fade-in-up">
            <div className="pill">Universo interactivo</div>
            <h1>{title}</h1>
            <p>{subtitle}</p>

            <div className="hero-actions">
                <Button as={Link as any} to="/chat" variant="light" className="shadow-sm rounded-pill px-4">
                    Probar el chat en vivo
                </Button>
                <Button
                    as={Link as any}
                    to="/galeria"
                    variant="outline-light"
                    className="rounded-pill px-4 text-white"
                >
                    Ver galería premium
                </Button>
            </div>

            <div className="hero-metrics">
                <div className="metric">
                    <span className="metric-label">Personajes</span>
                    <strong>03</strong>
                    <small>Biografías curadas</small>
                </div>
                <div className="metric">
                    <span className="metric-label">Escenas</span>
                    <strong>+25</strong>
                    <small>Momentos ilustrados</small>
                </div>
                <div className="metric">
                    <span className="metric-label">Chat</span>
                    <strong>Interactivo</strong>
                    <small>Respuestas ramificadas</small>
                </div>
            </div>
        </div>
    </header>
    );
};

export default Header;