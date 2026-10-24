import React from 'react';
import ArticleCard from './Card';
import { articlesList } from './content';

const FeaturedArticles = () => {
  return (
    <section className="section-container">
      <h2 className="section-heading">Featured Articles</h2>
      <div className="cards-grid">
        {articlesList.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      <div className="center-btn">
        <button className="see-all-btn">See all articles</button>
      </div>
    </section>
  );
};

export default FeaturedArticles;