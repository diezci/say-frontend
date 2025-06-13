import React, { useState } from 'react';
import { createJob } from '../services/api';

const JobModal = ({ onClose, onJobCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    specificRequirements: '',
    minimumBudget: '',
    maximumBudget: '',
    preferredDeadline: '',
    address: '',
    city: '',
    postalCode: '',
    isUrgent: false,
    contactPreference: 'chat'
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    'Limpieza', 'Reparaciones del Hogar', 'Jardinería', 'Carpintería',
    'Fontanería', 'Electricidad', 'Pintura', 'Mudanzas',
    'Cuidado Personal', 'Cocina/Chef', 'Otros'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'El título es requerido';
    if (!formData.category) newErrors.category = 'La categoría es requerida';
    if (!formData.description.trim()) newErrors.description = 'La descripción es requerida';
    if (!formData.minimumBudget) newErrors.minimumBudget = 'El presupuesto mínimo es requerido';
    if (!formData.maximumBudget) newErrors.maximumBudget = 'El presupuesto máximo es requerido';
    if (!formData.preferredDeadline) newErrors.preferredDeadline = 'La fecha límite es requerida';
    if (!formData.address.trim()) newErrors.address = 'La dirección es requerida';
    if (!formData.city.trim()) newErrors.city = 'La ciudad es requerida';
    
    if (parseFloat(formData.minimumBudget) >= parseFloat(formData.maximumBudget)) {
      newErrors.maximumBudget = 'El presupuesto máximo debe ser mayor al mínimo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const jobFormData = new FormData();
      
      Object.keys(formData).forEach(key => {
        jobFormData.append(key, formData[key]);
      });
      
      images.forEach(image => {
        jobFormData.append('images', image);
      });
      
      await createJob(jobFormData);
      
      if (onJobCreated) onJobCreated();
      onClose();
      
      alert('¡Trabajo publicado exitosamente!');
      
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Error al publicar el trabajo. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Publicar Nuevo Trabajo</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="job-form">
          <div className="form-section">
            <h3>Información Básica</h3>
            
            <div className="form-group">
              <label>Título del Trabajo *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ej: Limpieza profunda de apartamento"
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <span className="error-text">{errors.title}</span>}
            </div>
            
            <div className="form-group">
              <label>Categoría *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={errors.category ? 'error' : ''}
              >
                <option value="">Selecciona una categoría</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <span className="error-text">{errors.category}</span>}
            </div>
            
            <div className="form-group">
              <label>Descripción Detallada *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe detalladamente qué necesitas..."
                rows="4"
                className={errors.description ? 'error' : ''}
              />
              {errors.description && <span className="error-text">{errors.description}</span>}
            </div>
          </div>
          
          <div className="form-section">
            <h3>Presupuesto</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Presupuesto Mínimo (€) *</label>
                <input
                  type="number"
                  name="minimumBudget"
                  value={formData.minimumBudget}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className={errors.minimumBudget ? 'error' : ''}
                />
                {errors.minimumBudget && <span className="error-text">{errors.minimumBudget}</span>}
              </div>
              
              <div className="form-group">
                <label>Presupuesto Máximo (€) *</label>
                <input
                  type="number"
                  name="maximumBudget"
                  value={formData.maximumBudget}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className={errors.maximumBudget ? 'error' : ''}
                />
                {errors.maximumBudget && <span className="error-text">{errors.maximumBudget}</span>}
              </div>
            </div>
            
            <div className="form-group">
              <label>Fecha Límite Preferida *</label>
              <input
                type="date"
                name="preferredDeadline"
                value={formData.preferredDeadline}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className={errors.preferredDeadline ? 'error' : ''}
              />
              {errors.preferredDeadline && <span className="error-text">{errors.preferredDeadline}</span>}
            </div>
          </div>
          
          <div className="form-section">
            <h3>Ubicación</h3>
            
            <div className="form-group">
              <label>Dirección *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Calle, número, piso..."
                className={errors.address ? 'error' : ''}
              />
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Ciudad *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Madrid, Barcelona..."
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && <span className="error-text">{errors.city}</span>}
              </div>
              
              <div className="form-group">
                <label>Código Postal</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="28001"
                />
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h3>Imágenes</h3>
            
            <div className="form-group">
              <label>Subir Imágenes (máximo 5)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
              <p className="help-text">
                Sube fotos que ayuden a entender mejor el trabajo
              </p>
            </div>
          </div>
          
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Publicando...' : 'Publicar Trabajo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobModal;
