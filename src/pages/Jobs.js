import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import { getJobs } from '../services/api';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    city: '',
    minBudget: '',
    maxBudget: '',
    search: ''
  });

  const categories = [
    'Limpieza', 'Reparaciones del Hogar', 'Jardinería', 'Carpintería',
    'Fontanería', 'Electricidad', 'Pintura', 'Mudanzas',
    'Cuidado Personal', 'Cocina/Chef', 'Otros'
  ];

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await getJobs(filters);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      city: '',
      minBudget: '',
      maxBudget: '',
      search: ''
    });
  };

  return (
    <div className="jobs-page">
      <div className="container">
        <div className="page-header">
          <h1>Buscar Trabajos</h1>
          <p>Encuentra oportunidades de trabajo en tu área</p>
        </div>

        <div className="jobs-filters">
          <div className="filters-row">
            <div className="filter-group">
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Buscar trabajos..."
                className="search-input"
              />
            </div>
            
            <div className="filter-group">
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">Todas las categorías</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <input
                type="text"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                placeholder="Ciudad"
              />
            </div>
            
            <div className="filter-group">
              <input
                type="number"
                name="minBudget"
                value={filters.minBudget}
                onChange={handleFilterChange}
                placeholder="Presupuesto mín."
              />
            </div>
            
            <div className="filter-group">
              <input
                type="number"
                name="maxBudget"
                value={filters.maxBudget}
                onChange={handleFilterChange}
                placeholder="Presupuesto máx."
              />
            </div>
            
            <button className="btn-outline" onClick={clearFilters}>
              Limpiar Filtros
            </button>
          </div>
        </div>

        <div className="jobs-results">
          {loading ? (
            <div className="loading">Cargando trabajos...</div>
          ) : jobs.length > 0 ? (
            <div className="jobs-grid">
              {jobs.map(job => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No se encontraron trabajos con los filtros aplicados.</p>
              <button className="btn-primary" onClick={clearFilters}>
                Ver Todos los Trabajos
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
