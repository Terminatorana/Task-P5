import React from 'react';

const ArticleCard = ({ article }) => {
  return (
    <div className="card">
      <img src={article.image} alt={article.title} className="card-img" />
      <div className="card-body">
        <h3>{article.title}</h3>
        <p className="card-desc">{article.description}</p>
        <div className="card-meta">
          <span className="rating">
            <span style={{ marginRight: '4px' }}>⭐</span>
            {article.rating}
          </span>
          <span className="author">{article.author}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;