import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Search.css';

const AdvancedSearch = ({ onResults }) => {
  const [filters, setFilters] = useState({
    query: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    location: '',
    sortBy: 'date_desc'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const categories = [
    'Limpieza',
    'Reparaciones del Hogar',
    'Jardinería',
    'Carpintería',
    'Fontanería',
    'Electricidad',
    'Pintura',
    'Mudanzas',
    'Cuidado Personal',
    'Cocina/Chef',
    'Otros'
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/search/advanced?${params}`
      );
      
      onResults(response.data.data);
    } catch (error) {
      console.error('Error en búsqueda:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="advanced-search">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-row">
          <input
            type="text"
            placeholder="¿Qué servicio necesitas?"
            value={filters.query}
            onChange={(e) => handleInputChange('query', e.target.value)}
            className="search-input"
          />
          
          <select 
            value={filters.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="search-select"
          >
            <option value="">Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="search-row">
          <input
            type="number"
            placeholder="Precio mínimo (€)"
            value={filters.minPrice}
            onChange={(e) => handleInputChange('minPrice', e.target.value)}
            className="price-input"
          />
          
          <input
            type="number"
            placeholder="Precio máximo (€)"
            value={filters.maxPrice}
            onChange={(e) => handleInputChange('maxPrice', e.target.value)}
            className="price-input"
          />
          
          <input
            type="text"
            placeholder="Ciudad"
            value={filters.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="location-input"
          />
        </div>
        
        <div className="search-row">
          <select 
            value={filters.sortBy}
            onChange={(e) => handleInputChange('sortBy', e.target.value)}
            className="sort-select"
          >
            <option value="date_desc">Más recientes</option>
            <option value="price_asc">Precio: menor a mayor</option>
            <option value="price_desc">Precio: mayor a menor</option>
          </select>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="search-button"
          >
            {isLoading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdvancedSearch;