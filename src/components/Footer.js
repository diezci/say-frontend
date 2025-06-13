import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>SAY Marketplace</h4>
            <p>Conectamos profesionales verificados con clientes que necesitan servicios de calidad.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="LinkedIn">💼</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Para Clientes</h4>
            <ul>
              <li><Link to="/how-it-works">Cómo Funciona</Link></li>
              <li><Link to="/categories">Categorías</Link></li>
              <li><Link to="/jobs">Buscar Servicios</Link></li>
              <li><Link to="/support">Soporte</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Para Profesionales</h4>
            <ul>
              <li><Link to="/become-pro">Únete como Profesional</Link></li>
              <li><Link to="/pro-guide">Guía para Proveedores</Link></li>
              <li><Link to="/pricing">Precios</Link></li>
              <li><Link to="/pro-support">Soporte Profesional</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Empresa</h4>
            <ul>
              <li><Link to="/about">Acerca de</Link></li>
              <li><Link to="/careers">Trabajar con nosotros</Link></li>
              <li><Link to="/press">Prensa</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-legal">
            <Link to="/privacy">Política de Privacidad</Link>
            <Link to="/terms">Términos de Servicio</Link>
            <Link to="/cookies">Política de Cookies</Link>
          </div>
          <div className="footer-copyright">
            © 2024 SAY Marketplace. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
