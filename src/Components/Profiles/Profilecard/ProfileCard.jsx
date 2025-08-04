// import React from 'react'
// import "./ProfileCard.css" 

// function ProfileCard() {
//   return (
//     <>
//       <div className="pwrapper">
//         <div className="pheaderpc">
//           <div className="pcbanner">
//             <img src="" alt="" />
//           </div>
//           <div className="imganicontag">
//             <div className="profilepc">
//               <img src="" alt="" />
//             </div>
//             <div className="pctag">
//               <div className="pctag_img">
//                 <img src="" alt="" />
//               </div>
//               text
//             </div>
//           </div>
//         </div>

//         <div className="pbottompc">
//           <div className="pcheaderinfo">
//             <div></div>
//             <div className="pcshare">

//             </div>
//           </div>
//           <div className="pc_iconsinfo">

//           </div>
//           <div className="pc_followbutton">
//             Get in Touch
//           </div>
//         </div>

//       </div>
//     </>
//   )
// }

// export default ProfileCard

import './ProfileCard.css';

export default function ProfileCard() {
  return (
    <div className="card-container">
      <div className="card-image"></div>
      <div className="card-content">
        <div className="card-header">
          <img
            className="avatar"
            src="https://i.pravatar.cc/100?img=3"
            alt="Profile"
          />
          <span className="badge">Adobe Co.</span>
        </div>

        <div className="card-info">
          <h2>Alex Turner</h2>
          <p>Creative Director</p>
        </div>

        <div className="stats">
          <div className="stat">
            <span>⭐</span>
            <p>5.0<br /><small>Rating</small></p>
          </div>
          <div className="stat">
            <span>💵</span>
            <p>$150<br /><small>Hours</small></p>
          </div>
          <div className="stat">
            <span>📅</span>
            <p>24<br /><small>Month</small></p>
          </div>
        </div>

        <button className="contact-button">Get In Touch</button>
      </div>
    </div>
  );
}
