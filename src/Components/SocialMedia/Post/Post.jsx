import React from "react";
import "./Post.css";

function Post({
  profilePic = "/DemoImages/profile.jpg",
  username = "john_doe",
  location = "New York, USA",
  postImage = "/DemoImages/post.jpg",
  likes = 120,
  caption = "Loving this view!",
  timeAgo = "2 hours ago"
}) {
  return (
    <div className="post-card">
      {/* Header */}
      <div className="post-header">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <div className="user-info">
          <span className="username">{username}</span>
          <span className="location">{location}</span>
        </div>
        <button className="options-btn">•••</button>
      </div>

      {/* Post Image */}
      <div className="post-image-container">
        <img src={postImage} alt="Post" className="post-image" />
      </div>

      {/* Actions */}
      <div className="post-actions">
        <div className="left-actions">
          <button>❤️</button>
          <button>💬</button>
          <button>📤</button>
        </div>
        <div className="right-actions">
          <button>🔖</button>
        </div>
      </div>

      {/* Likes */}
      <div className="likes">{likes} likes</div>

      {/* Caption */}
      <div className="caption">
        <span className="username">{username}</span> {caption}
      </div>

      {/* Time */}
      <div className="time">{timeAgo}</div>
    </div>
  );
}

export default Post