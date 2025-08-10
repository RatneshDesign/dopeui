import Post from "./Post";

function Demo() {
  return (
    // <div style={{ padding: "20px", background: "#fafafa" }}>
      <Post
        profilePic="/DemoImages/2davtar.jpg"
        username="alex_turner"
        location="London, UK"
        postImage="/DemoImages/Fashionwear.jpeg"
        likes={1082}
        caption="Beautiful designs 🌟"
        timeAgo="5 weeks ago"
      />
    // </div>
  );
}

export default Demo