import React from "react";
import "./ProfileCard.css";
export default function ProfileCard() {
  return (

    <div className="card-container">
      <div className="image-wrapper">
        <div className="bg-img-container">
          <img src="/DemoImages/Fashionwear.jpeg" alt="Background" className="bg-img" />
        </div>

        <div className="pic-header">
          <div className="profile-pic">
            <img src="/DemoImages/2davtar.jpg" alt="Profile" />
          </div>
          <div className="company-tag">
            <img src="/DemoImages/Logo_NIKE.png" alt="Adobe" className="company-logo" />
            <span>Adobe Co.</span>
          </div>
        </div>

      </div>

      <div className="card-content">
        <div className="share-prof">
          <div className="hedpic">

            <h2>Ratnesh kumawat</h2>
            <span className="role">Ui Designer | Developer</span>
          </div>
          <div className="shareprofile">

          </div>
        </div>
        <div className="stats">
          <div className="stat-item">
            <span className="star">★</span>
            <div>
              <strong>5.0</strong>
              <p>Rating</p>
            </div>
          </div>
          <div className="stat-item">
            <span className="price">$150</span>
            <div>
              <strong>hours</strong>
            </div>
          </div>
          <div className="stat-item">
            <span className="clock">⏰</span>
            <div>
              <strong>24</strong>
              <p>Month</p>
            </div>
          </div>
        </div>

      </div>
      <button className="cta-button">Get In Touch</button>
    </div>
  );
}
