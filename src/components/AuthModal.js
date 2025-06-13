import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    userType: 'client'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { login, register } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = 'El nombre es requerido';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          userType: formData.userType
        });
      }
      
      if (onSuccess) onSuccess();
      onClose();
      
    } catch (error) {
      setErrors({ submit: error.message || 'Error en la autenticación' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content auth-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label>Nombre Completo *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Tu nombre completo"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
          )}
          
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="tu@email.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label>Contraseña *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Mínimo 6 caracteres"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          {!isLogin && (
            <>
              <div className="form-group">
                <label>Confirmar Contraseña *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Repite tu contraseña"
                  className={errors.confirmPassword ? 'error' : ''}
                />
                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
              </div>
              
              <div className="form-group">
                <label>Tipo de Usuario</label>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                >
                  <option value="client">Cliente</option>
                  <option value="provider">Proveedor</option>
                  <option value="both">Ambos</option>
                </select>
              </div>
            </>
          )}
          
          {errors.submit && (
            <div className="error-text">{errors.submit}</div>
          )}
          
          <div className="modal-actions">
            <button type="submit" className="btn-primary btn-full" disabled={loading}>
              {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
            </button>
          </div>
          
          <div className="auth-switch">
            {isLogin ? (
              <p>
                ¿No tienes cuenta?{' '}
                <button 
                  type="button" 
                  className="link-button"
                  onClick={() => setIsLogin(false)}
                >
                  Regístrate aquí
                </button>
              </p>
            ) : (
              <p>
                ¿Ya tienes cuenta?{' '}
                <button 
                  type="button" 
                  className="link-button"
                  onClick={() => setIsLogin(true)}
                >
                  Inicia sesión aquí
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
