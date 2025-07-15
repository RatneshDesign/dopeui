import { useState } from "react";
import "./Productcard.css"

function ProductCard() {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <div className="productcard">
        <img src="/DemoImages/shoes.png" alt="image name" />
        <div className={`productcard_details ${expanded ? "expanded" : ""}`}>
          <div className="detailsrow">
            {/* pass your propes */}
            <h3>Shoes</h3>
            <button
              className="morebtn"
              onClick={() => setExpanded(!expanded)}
              aria-label="Toggle more details"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
                <path d="M11.992 12H12.001" stroke="#000000ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11.9842 18H11.9932" stroke="#000000ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11.9998 6H12.0088" stroke="#000000ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="otherdetails">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={15} height={15} color={"#000000"} fill={"none"}>
              <path d="M18.4167 8.14815C18.4167 5.85719 15.5438 4 12 4C8.45617 4 5.58333 5.85719 5.58333 8.14815C5.58333 10.4391 7.33333 11.7037 12 11.7037C16.6667 11.7037 19 12.8889 19 15.8519C19 18.8148 15.866 20 12 20C8.13401 20 5 18.1428 5 15.8519" stroke="#000000ff" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 2V22" stroke="#000000ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {/* pass your propes */}
            <h4>100</h4>
          </div>
          <div className="actionsbtns_productcard">
            {/* actions buttons here */}
            <button className="actionbtn_pc1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#000000"} fill={"none"}>
                <path d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"></path>
                <path d="M13 4L20 11" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"></path>
                <path d="M14 22L22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span>Update</span>
            </button>
            <button className="actionbtn_pc1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#000000"} fill={"none"}>
                <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
              </svg>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCard