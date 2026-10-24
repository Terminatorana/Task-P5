import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-main">
      <div className="footer-columns">
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li>Home</li>
            <li>Questions</li>
            <li>Articles</li>
            <li>Tutorials</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li>FAQs</li>
            <li>Help</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Stay connected</h4>
          <div className="social-icons">
            {/* Replaced Lucide icons with text/emojis */}
            <span className="icon">FB</span>
            <span className="icon">TW</span>
            <span className="icon">IG</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom-row">
        <p>DEV@Deakin 2022</p>
        <div className="footer-bottom-links">
          <span>Privacy Policy</span>
          <span>Terms</span>
          <span>Code of Conduct</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;