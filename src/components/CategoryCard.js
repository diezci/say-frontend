import React from 'react';

const CategoryCard = ({ category }) => {
  return (
    <div className="category-card">
      <div className="category-icon">{category.icon}</div>
      <div className="category-name">{category.name}</div>
      <div className="category-stats">
        <span className="category-demand">Demanda: {category.demand}</span>
        <span className="category-jobs">{category.jobs} trabajos</span>
      </div>
    </div>
  );
};

export default CategoryCard;
