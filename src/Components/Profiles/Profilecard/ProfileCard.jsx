import React from "react";
import "./ProfileCard.css";
export default function ProfileCard() {
  return (

    <div className="card-container">
      <div className="image-wrapper">
        <div className="bg-img-container">
          <img src="/DemoImages/futurecity.jpeg" alt="Background" className="bg-img" />
        </div>

        <div className="pic-header">
          <div className="profile-pic">
            <img src="/DemoImages/2davtar.jpg" alt="Profile" />
          </div>
          <div className="company-tag">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
              <circle cx="15" cy="12" r="3"  strokeWidth="1.5" strokeLinejoin="round"></circle>
              <path d="M9 21C10.6569 21 12 19.6569 12 18V15H9C7.34315 15 6 16.3431 6 18C6 19.6569 7.34315 21 9 21Z"  strokeWidth="1.5" strokeLinejoin="round"></path>
              <path d="M12 9V15H9C7.34315 15 6 13.6569 6 12C6 10.3431 7.34315 9 9 9H12Z"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M12 3V9H9C7.34315 9 6 7.65685 6 6C6 4.34315 7.34315 3 9 3H12Z"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M12 3V9H15C16.6569 9 18 7.65685 18 6C18 4.34315 16.6569 3 15 3H12Z"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            {/* <img src="/DemoImages/Logo_NIKE.png" alt="Adobe" className="company-logo" /> */}
            <span>Figma</span>
          </div>
        </div>

      </div>

      <div className="card-content">
        <div className="share-prof">
          <div className="hedpic">

            <h2>Ratnesh kumawat</h2>
            <span className="role">Ui Designer | Developer</span>
          </div>
          <a href="https://www.linkedin.com/in/ratnesh-kumawat-6301b425b/" target="_blank" className="shareprofile">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={26} height={26} color={"#000000"} fill={"none"}>
              <path d="M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z" stroke="#000000ff" strokeWidth="1.7" />
              <path d="M11.5 12.5L15 9" stroke="#000000ff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
        <div className="stats">
          <div className="stat-item">
            {/* <span className="star">★</span> */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
              <path d="M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <strong>5.0</strong>
              <p>Rating</p>
            </div>
          </div>
          <div className="stat-item">
            {/* <span className="price">$</span> */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
              <path d="M4 7L4 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M11.7576 3.90865C8.45236 2.22497 5.85125 3.21144 4.55426 4.2192C4.32048 4.40085 4.20358 4.49167 4.10179 4.69967C4 4.90767 4 5.10138 4 5.4888V14.7319C4.9697 13.6342 7.87879 11.9328 11.7576 13.9086C15.224 15.6744 18.1741 14.9424 19.5697 14.1795C19.7633 14.0737 19.8601 14.0207 19.9301 13.9028C20 13.7849 20 13.6569 20 13.4009V5.87389C20 5.04538 20 4.63113 19.8027 4.48106C19.6053 4.33099 19.1436 4.459 18.2202 4.71504C16.64 5.15319 14.3423 5.22532 11.7576 3.90865Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <div>
              <strong>$100</strong>
              <p>hours</p>
            </div>
          </div>
          <div className="stat-item">
            {/* <span className="clock">⏰</span> */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
              <circle cx="12" cy="12" r="10" stroke="#000000" strokeWidth="1.5" />
              <path d="M12 8V12L14 14" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
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
