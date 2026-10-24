import React from 'react';
import TutorialCard from './Tutorial';
import { tutorialsList } from './content';

const FeaturedTutorials = () => {
  return (
    <section className="section-container">
      <h2 className="section-heading">Featured Tutorials</h2>
      <div className="cards-grid">
        {tutorialsList.map((tutorial) => (
          <TutorialCard key={tutorial.id} tutorial={tutorial} />
        ))}
      </div>
      <div className="center-btn">
        <button className="see-all-btn">See all tutorials</button>
      </div>
    </section>
  );
};

export default FeaturedTutorials;
