import { useEffect, useState, useRef } from "react";
import Spline from '@splinetool/react-spline';
import { Link } from 'react-router-dom';
import "./Home.css"
import { motion, AnimatePresence } from "framer-motion";
import Lenis from 'lenis';

function Home() {

  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const containerRef = useRef(null);
  const names = ["Product Card Design", "Profile Card", "New Cards"];

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.scrollTo(0, { immediate: true });

    return () => {
      lenis.destroy();
    };
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % names.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const nextWidth = containerRef.current.offsetWidth;
      setWidth(nextWidth);
    }
  }, [index]);

  return (
    <>
      <svg width="0" height="0">
        <defs>
          <clipPath id="myClip" clipPathUnits="objectBoundingBox">
            <path d="
        M0.7471,0.1283 
        C0.7471,0.1752 0.7652,0.2131 0.7872,0.2131 
        H0.9603 
        C0.9824,0.2131 1.0000,0.2506 1.0000,0.2978 
        V0.9392 
        C1.0000,0.9710 0.9871,1.0000 0.9716,1.0000 
        H0.4168 
        C0.3947,1.0000 0.3769,0.9617 0.3769,0.9151 
        V0.8425 
        C0.3769,0.7956 0.3590,0.7573 0.3370,0.7573 
        H0.0399 
        C0.0179,0.7573 0.0000,0.7190 0.0000,0.6732 
        V0.2179 
        C0.0000,0.1778 0.0153,0.1453 0.0341,0.1453 
        C0.0529,0.1453 0.0683,0.1091 0.0683,0.0726 
        C0.0683,0.0358 0.0837,0.0000 0.1035,0.0000 
        H0.7075 
        C0.7296,0.0000 0.7471,0.0383 0.7471,0.0848 
        V0.1283 
        Z
      " />
          </clipPath>
        </defs>

        <filter id='gooey'>
          <feGaussianBlur in='SourceGraphic' stdDeviation="10" />
          <feColorMatrix values="
        1 0 0 0 0
        0 1 0 0 0
        0 0 1 0 0 
        0 0 0 50 -20" />
        </filter>
      </svg>

      <nav className='Homenav'>
        <div className="logo">
          <img src="/navlogo.svg" alt="" />
        </div>
        <div className='navitems' style={{ position: "absolute", right: 0 }}>
          <div className='bglinks_nav'>
            <span>Home</span>
            <span>Docs</span>
          </div>
          <div className="bglinks_nav" style={{ padding: "0.5em", height: "50%" }} ></div>
          <div className="bglinks_nav">
            <span>Github</span>
          </div>
        </div>
        <div className='navitems' style={{ filter: 'none', zIndex: 10 }}>
          <div className='bglinks_nav' style={{ background: "#101010", height: "88%", padding: "0em 1.8em", transform: "translate(-1px)" }} >
            <Link to={"/"}>Home</Link>
            <Link to={"/Docs"}>Docs</Link>
          </div>
          <div className="bglinks_nav" style={{ padding: "0.5em", height: "60%", marginTop: "3% ", opacity: 0 }} ></div>
          <div className="bglinks_nav"
          >
            {/* <a href='https://github.com/RatneshDesign/dopeui' target='_blank'>Github</a> */}
            <a href='' target='_blank'>Github</a>
          </div>
        </div>
      </nav>

      <div className="herosection">
        <AnimatePresence mode="wait">
          <motion.div
            className="newadded"
            animate={{ width }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div ref={containerRef} style={{ display: "inline-flex", alignItems: "center", justifyContent: "space-between", gap: "5px" }}>
              <motion.img
                src="/Star.svg"
                alt="star"
                width={15}
                height={15}
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: "linear"
                }}
              />
              <span>Introducing</span>
              <motion.span
                key={names[index]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                style={{ display: "inline-block", marginRight: "10px" }}
              >
                {names[index]}
              </motion.span>
              <div className="neworupdate">New</div>
            </div>
          </motion.div>
        </AnimatePresence>


        <h1>Build Beautiful UIs,<br /> the Dope Way.</h1>
        <p style={{ width: "50%", textAlign: "center", opacity: 0.7 }}>DopeUI gives React developers a powerful set of prebuilt components, layout templates, and design utilities inspired by real-world UI patterns. Say goodbye to repetitive boilerplate — and hello to clean, scalable code.</p>
        <div className="bglinks_nav" style={{ height: "fit-content", marginTop: "2vh" }}>
          <Link to={'/docs'}>
            <h4>Browse Components</h4>
          </Link>
        </div>
        <div className="glow"></div>
        <div className="glow"></div>
      </div >


      <div className="svgwrapperdope">
        <div className="blackbox_swdop">
          <div className="cornericon"></div>
          <div className="dopeinfo">
            <div>
              <h1>
                100%
              </h1>
              <span>Free & open source</span>
            </div>
            <hr style={{ height: "50%", border: " 1px solid #E64F21" }} />
            <div>
              <h1>
                10+
              </h1>
              <span>Components</span>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "90vw",
            height: "90vh",
            clipPath: "url(#myClip)",
            WebkitClipPath: "url(#myClip)",
            overflow: "hidden",
            background: "#fff",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <main className='svgmain'>
            <Spline
              scene="https://prod.spline.design/auqP7kMYXZ4w2sL2/scene.splinecode"
              controls={{
                zoom: false,
                pan: false,
                rotate: false,
              }}
            />
          </main>

        </div>

        <div className="lastsection_onswdop">
          <div className="holding_headings" style={{ width: "fit-content" }}>yooooooo</div>
          <div className="holding_headings">hewll </div>
        </div>

      </div>
      <hr style={{ width: "90vw", border: "1px solid #E64F21", marginTop: "10vh", marginBottom: "5vh" }} />
      <footer>
        <div className='footer_s1'>
          <img src="coloredlogo.svg" alt="logo" />
          <div className='fueled'>
            <span>Fueled by</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#fff"} fill={"none"}>
              <path fill='#E64121' d="M12 21.5008C16.4183 21.5008 20 17.9191 20 13.5008C20 10.5397 18.3912 6.60684 16 4.33478L14 6.99915L10.5 2.49915C7 4.99915 4 9.59526 4 13.5008C4 17.9191 7.58172 21.5008 12 21.5008Z" stroke="#" strokeWidth="1.5" strokeLinejoin="round" />
              <path fill='#E6aF21' d="M12 18.4991C14.2091 18.4991 16 16.4844 16 13.9991C16 13.2081 15.8186 12.4648 15.5 11.8189L13.5 13.4991L10.5 9.49811C9.5 10.4981 8 12.1106 8 13.9991C8 16.4844 9.79086 18.4991 12 18.4991Z" stroke="#" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <span> built by <a target='_blank' style={{ color: "#E64F21" }} href="https://ratneshkumawat.vercel.app">this guy</a></span>
          </div>
          <span style={{ opacity: 0.7, fontWeight: 200, letterSpacing: 1 }}>©2025 dopeui All rights reserved</span>
        </div>
        <div className="footer_s2">
          {/* <a target='_blank' href='https://github.com/RatneshDesign'>Github</a> */}
          <a target='_blank' href=''>Github</a>
          <Link to={'/docs'}>Docs</Link>
          <a target='_blank' href='https://www.linkedin.com/in/ratnesh-kumawat-6301b425b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'>Linkedin</a>
          <a target='_blank' href='https://www.instagram.com/_ratnesh.design?igsh=M2lzNmRveTQ5MXFo'>Instagram</a>
        </div>
      </footer>
    </>
  )
}

export default Home