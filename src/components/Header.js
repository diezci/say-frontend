import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Header = () => {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-text">SAY</span>
            <span className="logo-subtitle">Marketplace</span>
          </Link>

          <nav className="nav">
            <Link to="/" className="nav-link">Inicio</Link>
            <Link to="/jobs" className="nav-link">Trabajos</Link>
            <Link to="/categories" className="nav-link">Categorías</Link>
            <Link to="/how-it-works" className="nav-link">Cómo Funciona</Link>
          </nav>

          <div className="header-actions">
            {user ? (
              <div className="user-menu">
                <button 
                  className="user-avatar"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <img 
                    src={user.profileImage || '/default-avatar.png'} 
                    alt={user.name}
                  />
                  <span>{user.name}</span>
                  <svg className="chevron-down" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {showUserMenu && (
                  <div className="user-dropdown">
                    <Link to="/dashboard" className="dropdown-item">
                      <svg className="icon" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                      Dashboard
                    </Link>
                    <Link to="/profile" className="dropdown-item">
                      <svg className="icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      Mi Perfil
                    </Link>
                    <button onClick={handleLogout} className="dropdown-item">
                      <svg className="icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                      </svg>
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <button 
                  className="btn-outline"
                  onClick={() => setShowAuthModal(true)}
                >
                  Iniciar Sesión
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => setShowAuthModal(true)}
                >
                  Registrarse
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </header>
  );
};

export default Header;
