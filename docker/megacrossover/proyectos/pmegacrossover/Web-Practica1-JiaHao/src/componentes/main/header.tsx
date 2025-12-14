import React from "react";
import "./header.css";

interface HeaderProps {
    title: string;
    subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
    return ( 
    <header className="imagen">
        <div className="contenido fade-in-up">
            <h1>{title}</h1>
            <p>{subtitle}</p>
        </div>
    </header>
    );
};

export default Header;