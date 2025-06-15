import React, { useState } from 'react';
import axios from 'axios';
import './Rating.css';

const RatingForm = ({ jobId, providerId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.REACT_APP_API_URL}/reviews`, {
        jobId,
        revieweeId: providerId,
        rating,
        comment
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert('¡Reseña enviada exitosamente!');
      setRating(5);
      setComment('');
      if (onReviewSubmitted) onReviewSubmitted();
    } catch (error) {
      console.error('Error enviando reseña:', error);
      alert('Error enviando la reseña');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={submitReview} className="rating-form">
      <h3>Evaluar Servicio</h3>
      
      <div className="stars-container">
        <label>Calificación:</label>
        <div className="stars">
          {[1,2,3,4,5].map((star) => (
            <button 
              key={star}
              type="button"
              className={`star ${star <= rating ? 'active' : ''}`}
              onClick={() => setRating(star)}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      
      <div className="comment-container">
        <label htmlFor="comment">Comentario:</label>
        <textarea
          id="comment"
          placeholder="Describe tu experiencia con el proveedor..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />
      </div>
      
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="submit-btn"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar Reseña'}
      </button>
    </form>
  );
};

export default RatingForm;