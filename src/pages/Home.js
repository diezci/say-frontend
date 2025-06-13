import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import JobModal from '../components/JobModal';
import CategoryCard from '../components/CategoryCard';
import JobCard from '../components/JobCard';
import AuthModal from '../components/AuthModal';
import { getJobs } from '../services/api';

const Home = () => {
  const { user } = useAuth();
  const [showJobModal, setShowJobModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: 'Limpieza', icon: '🧹', demand: '95%', jobs: 1250 },
    { name: 'Reparaciones', icon: '🔧', demand: '90%', jobs: 980 },
    { name: 'Jardinería', icon: '🌱', demand: '85%', jobs: 750 },
    { name: 'Carpintería', icon: '🪚', demand: '80%', jobs: 620 },
    { name: 'Fontanería', icon: '🚰', demand: '88%', jobs: 540 },
    { name: 'Electricidad', icon: '⚡', demand: '82%', jobs: 480 },
    { name: 'Pintura', icon: '🎨', demand: '75%', jobs: 420 },
    { name: 'Mudanzas', icon: '📦', demand: '70%', jobs: 380 }
  ];

  // Mock data para mostrar en desarrollo
  const mockJobs = [
    {
      _id: '1',
      title: 'Limpieza profunda de apartamento',
      category: 'Limpieza',
      description: 'Necesito una limpieza profunda de mi apartamento de 80m2. Incluye cocina, baños, dormitorios y salón.',
      budget: { minimum: 80, maximum: 120 },
      location: { city: 'Madrid' },
      status: 'open',
      proposals: [],
      isUrgent: false,
      createdAt: new Date()
    },
    {
      _id: '2',
      title: 'Reparación de grifo de cocina',
      category: 'Fontanería',
      description: 'El grifo de la cocina gotea constantemente y necesita ser reparado o reemplazado.',
      budget: { minimum: 50, maximum: 100 },
      location: { city: 'Barcelona' },
      status: 'open',
      proposals: [{}],
      isUrgent: true,
      createdAt: new Date()
    }
  ];

  useEffect(() => {
    fetchRecentJobs();
  }, []);

  const fetchRecentJobs = async () => {
    try {
      // Intentar obtener trabajos reales del API
      const response = await getJobs({ limit: 6, sortBy: 'createdAt' });
      setRecentJobs(response.data);
    } catch (error) {
      // Si falla, usar datos de ejemplo
      console.log('Usando datos de ejemplo');
      setRecentJobs(mockJobs);
    } finally {
      setLoading(false);
    }
  };

  const handlePublishJob = () => {
    if (user) {
      setShowJobModal(true);
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Encuentra el servicio perfecto para tu hogar</h1>
          <p>Conectamos a profesionales verificados con clientes que necesitan servicios de calidad</p>
          
          <div className="hero-actions">
            <button 
              className="btn-primary btn-large"
              onClick={handlePublishJob}
            >
              Publicar Trabajo
            </button>
            <button className="btn-secondary btn-large">
              Buscar Servicios
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">15,000+</span>
              <span className="stat-label">Profesionales</span>
            </div>
            <div className="stat">
              <span className="stat-number">50,000+</span>
              <span className="stat-label">Trabajos Completados</span>
            </div>
            <div className="stat">
              <span className="stat-number">4.8/5</span>
              <span className="stat-label">Calificación Promedio</span>
            </div>
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="container">
          <h2>Categorías Populares</h2>
          <p>Encuentra profesionales en las áreas más demandadas</p>
          
          <div className="categories-grid">
            {categories.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="recent-jobs">
        <div className="container">
          <div className="section-header">
            <h2>Trabajos Recientes</h2>
            <button className="btn-outline">Ver Todos</button>
          </div>
          
          {loading ? (
            <div className="loading">Cargando trabajos...</div>
          ) : (
            <div className="jobs-grid">
              {recentJobs.map(job => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2>¿Cómo Funciona?</h2>
          
          <div className="steps">
            <div className="step">
              <div className="step-icon">1</div>
              <h3>Publica tu Trabajo</h3>
              <p>Describe qué necesitas y recibe propuestas de profesionales verificados</p>
            </div>
            
            <div className="step">
              <div className="step-icon">2</div>
              <h3>Compara Propuestas</h3>
              <p>Revisa perfiles, precios y reseñas para elegir el mejor profesional</p>
            </div>
            
            <div className="step">
              <div className="step-icon">3</div>
              <h3>Contrata y Paga</h3>
              <p>Contrata con confianza y paga de forma segura cuando el trabajo esté completo</p>
            </div>
          </div>
        </div>
      </section>

      {showJobModal && (
        <JobModal 
          onClose={() => setShowJobModal(false)}
          onJobCreated={fetchRecentJobs}
        />
      )}
      
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => {
            setShowAuthModal(false);
            setShowJobModal(true);
          }}
        />
      )}
    </div>
  );
};

export default Home;
