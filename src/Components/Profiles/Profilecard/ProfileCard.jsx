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


import './ProfileCard.css';

function ProfileCard() {
  return (
    <div className="card_container">
      <div className="card_image"></div>
      <div className="card_content">
        <div className="card_header">
          <img
            className="avatar"
            src="/DemoImages/2davtar.jpg"
            alt="Profile"
          />
          <span className="badge">Adobe Co.</span>
        </div>

        <div className="card_info">
          <h2>Alex Turner</h2>
          <p>Creative Director</p>
        </div>

        <div className="stats">
          <div className="stat">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
              <path d="M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p>5.0<br /><small>Rating</small></p>
          </div>
          <div className="stat">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
              <path d="M14.5 12.001C14.5 13.3817 13.3807 14.501 12 14.501C10.6193 14.501 9.5 13.3817 9.5 12.001C9.5 10.6203 10.6193 9.50098 12 9.50098C13.3807 9.50098 14.5 10.6203 14.5 12.001Z" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18.5 11.49V11.5" stroke="#141B34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5.5 12.49V12.5" stroke="#141B34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 5.00098C18.4794 5.00098 20.1903 5.38518 21.1329 5.6773C21.6756 5.84549 22 6.35987 22 6.92803V16.6833C22 17.7984 20.7719 18.6374 19.6762 18.4305C18.7361 18.253 17.5107 18.1104 16 18.1104C11.2491 18.1104 10.1096 19.9161 3.1448 18.3802C2.47265 18.232 2 17.6275 2 16.9392V6.92214C2 5.94628 2.92079 5.23464 3.87798 5.42458C10.1967 6.67844 11.4209 5.00098 16 5.00098Z" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p>$150<br /><small>Hours</small></p>
          </div>
          <div className="stat">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} >
              <circle cx="12" cy="12" r="10" stroke="#141B34" strokeWidth="1.5" />
              <path d="M12 8V12L14 14" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p>24<br /><small>Month</small></p>
          </div>
        </div>

        <button className="contact_button">Get In Touch</button>
      </div>
    </div>
  );
}

export default ProfileCard