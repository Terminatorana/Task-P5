import React from 'react';

const TutorialCard = ({ tutorial }) => {
  return (
    <div className="card">
      <img src={tutorial.image} alt={tutorial.title} className="card-img" />
      <div className="card-body">
        <h3>{tutorial.title}</h3>
        <p className="card-desc">{tutorial.description}</p>
        <div className="card-meta">
          <span className="rating">
            <span style={{ marginRight: '4px' }}>⭐</span>
            {tutorial.rating}
          </span>
          <span className="author">{tutorial.username}</span>
        </div>
      </div>
    </div>
  );
};

export default TutorialCard;