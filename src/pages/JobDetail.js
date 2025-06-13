import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getJobById } from '../services/api';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const response = await getJobById(id);
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Cargando trabajo...</div>;
  }

  if (!job) {
    return <div className="error">Trabajo no encontrado</div>;
  }

  return (
    <div className="job-detail">
      <div className="container">
        <div className="job-header">
          <h1>{job.title}</h1>
          <div className="job-meta">
            <span className="job-category">{job.category}</span>
            <span className="job-status">{job.status}</span>
          </div>
        </div>

        <div className="job-content">
          <div className="job-main">
            <section className="job-description">
              <h2>Descripción</h2>
              <p>{job.description}</p>
              
              {job.specificRequirements && (
                <>
                  <h3>Requisitos Específicos</h3>
                  <p>{job.specificRequirements}</p>
                </>
              )}
            </section>

            <section className="job-location">
              <h2>Ubicación</h2>
              <p>{job.location.address}, {job.location.city}</p>
            </section>

            {job.images && job.images.length > 0 && (
              <section className="job-images">
                <h2>Imágenes</h2>
                <div className="images-grid">
                  {job.images.map((image, index) => (
                    <img key={index} src={image.url} alt={`Imagen ${index + 1}`} />
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="job-sidebar">
            <div className="job-budget">
              <h3>Presupuesto</h3>
              <p className="budget-amount">
                €{job.budget.minimum} - €{job.budget.maximum}
              </p>
            </div>

            <div className="job-deadline">
              <h3>Fecha Límite</h3>
              <p>{new Date(job.preferredDeadline).toLocaleDateString()}</p>
            </div>

            <div className="job-proposals">
              <h3>Propuestas</h3>
              <p>{job.proposals?.length || 0} propuestas recibidas</p>
            </div>

            <div className="job-actions">
              <button className="btn-primary btn-full">
                Enviar Propuesta
              </button>
              <button className="btn-outline btn-full">
                Contactar Cliente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
