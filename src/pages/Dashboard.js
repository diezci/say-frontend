import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import JobCard from '../components/JobCard';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    completedJobs: 0,
    totalEarnings: 0
  });

  if (!user) {
    return (
      <div className="dashboard">
        <div className="container">
          <p>Debes iniciar sesión para acceder al dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Bienvenido, {user.name}</p>
        </div>

        <div className="dashboard-tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Resumen
          </button>
          <button 
            className={`tab ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            Mis Trabajos
          </button>
          <button 
            className={`tab ${activeTab === 'proposals' ? 'active' : ''}`}
            onClick={() => setActiveTab('proposals')}
          >
            Propuestas
          </button>
          <button 
            className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Perfil
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <div className="overview">
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Trabajos Totales</h3>
                  <p className="stat-number">{stats.totalJobs}</p>
                </div>
                <div className="stat-card">
                  <h3>Trabajos Activos</h3>
                  <p className="stat-number">{stats.activeJobs}</p>
                </div>
                <div className="stat-card">
                  <h3>Trabajos Completados</h3>
                  <p className="stat-number">{stats.completedJobs}</p>
                </div>
                <div className="stat-card">
                  <h3>Ganancias Totales</h3>
                  <p className="stat-number">€{stats.totalEarnings}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'jobs' && (
            <div className="my-jobs">
              <div className="section-header">
                <h2>Mis Trabajos Publicados</h2>
                <button className="btn-primary">Publicar Nuevo Trabajo</button>
              </div>
              <div className="jobs-list">
                <p>No has publicado trabajos aún.</p>
              </div>
            </div>
          )}

          {activeTab === 'proposals' && (
            <div className="proposals">
              <h2>Mis Propuestas</h2>
              <div className="proposals-list">
                <p>No has enviado propuestas aún.</p>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="profile">
              <h2>Mi Perfil</h2>
              <div className="profile-info">
                <div className="form-group">
                  <label>Nombre</label>
                  <input type="text" value={user.name} readOnly />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={user.email} readOnly />
                </div>
                <div className="form-group">
                  <label>Tipo de Usuario</label>
                  <input type="text" value={user.userType} readOnly />
                </div>
                <button className="btn-primary">Editar Perfil</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
