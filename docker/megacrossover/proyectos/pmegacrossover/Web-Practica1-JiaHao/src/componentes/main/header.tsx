import React from "react";
import "./header.css";

interface header {
    title: string;
    subtitle: string;
}

const header: React.FC<header> = ({ title, subtitle }) => {
    return ( 
    <header className="imagen">
        <div className="contenido">
            <h1>{title}</h1>
            <p>{subtitle}</p>
        </div>
    </header>
    );
};

export default header;
