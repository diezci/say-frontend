import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const JobCard = ({ job }) => {
  const formatBudget = (min, max) => {
    if (min === max) return `€${min}`;
    return `€${min} - €${max}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'green';
      case 'in_progress': return 'blue';
      case 'completed': return 'gray';
      case 'cancelled': return 'red';
      default: return 'gray';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'open': return 'Abierto';
      case 'in_progress': return 'En Progreso';
      case 'completed': return 'Completado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-category">{job.category}</div>
        <div className={`job-status status-${getStatusColor(job.status)}`}>
          {getStatusText(job.status)}
        </div>
      </div>
      
      <div className="job-card-content">
        <h3 className="job-title">
          <Link to={`/jobs/${job._id}`}>{job.title}</Link>
        </h3>
        
        <p className="job-description">
          {job.description.length > 150 
            ? `${job.description.substring(0, 150)}...` 
            : job.description
          }
        </p>
        
        <div className="job-details">
          <div className="job-location">
            <svg className="icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {job.location?.city || 'Sin ubicación'}
          </div>
          
          <div className="job-budget">
            <svg className="icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
            {formatBudget(job.budget?.minimum || 0, job.budget?.maximum || 0)}
          </div>
        </div>
        
        <div className="job-meta">
          <div className="job-proposals">
            {job.proposals?.length || 0} propuestas
          </div>
          
          <div className="job-time">
            {job.createdAt ? formatDistanceToNow(new Date(job.createdAt), { 
              addSuffix: true, 
              locale: es 
            }) : 'Fecha no disponible'}
          </div>
        </div>
        
        {job.isUrgent && (
          <div className="job-urgent">
            <svg className="icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Urgente
          </div>
        )}
      </div>
      
      <div className="job-card-footer">
        <Link to={`/jobs/${job._id}`} className="btn-outline btn-small">
          Ver Detalles
        </Link>
        
        {job.status === 'open' && (
          <button className="btn-primary btn-small">
            Enviar Propuesta
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
