import "./InfoCard.css"

function InfoCard({ image, title, p, price }) {
  return (
    <>
      <svg className="clipppy" >
        <defs>
          <clipPath id="clip-squiggle" clipPathUnits="userSpaceOnUse">
            <path d="M 0,10 A 10,10 0,0,1 10,0 L 190,0 A 10,10 0,0,1 200,10 L 200,30 A 10,10 0,0,0 210,40 L 280,40 A 10,10 0,0,1 290,50 L 290,380 A 10,10 0,0,1 280,390 L 10,390 A 10,10 0,0,1 0,380 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="card_container">
        <div className="logo_on_card">
          {/* <h2>Nike</h2> */}
          <img src={image} alt={title} />
        </div>

        <figure className="clippath_container_forimage" style={{ clipPath: 'url(#clip-squiggle)' }}>
          <div className="image_blur_wrapper">
            <img src="/DemoImages/shoes.png" alt="adding image here.." />
            <div className="card_info">
              <h3>{title}</h3>
              <span>{p}</span>
              <div className="price_tag">
                <span>{price}</span>
              </div>
            </div>
          </div>
          <div className="blur_wrapper">
            <div className="blur_block"></div>
          </div>
        </figure>
      </div>
    </>
  )
}

export default InfoCard