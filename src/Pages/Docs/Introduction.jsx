import "./intro.css"
import { Link } from "react-router-dom"
function Introduction() {
  return (
    <>
      <h1>
        Introduction
      </h1>

      <section class="dopeui-intro">
        <h1><span>DopeUI</span> - Build fast. Build clean.</h1>
        <p style={{ width: "80%" }}>
          DopeUI is a lightweight, modern component library for React developers who value speed, flexibility, and aesthetics.
          Whether you're building a startup MVP or scaling a complex UI system, DopeUI helps you ship faster — without
          compromising design or performance.
        </p>

        <ul>
          <li>⚡ Minimal, fast, and zero-dependency components</li>
          <li>🎨 Fully customizable with your own styles</li>
          <li>🧱 Easy-to-use building blocks for modern interfaces</li>
          <li>📦 Tree-shakable, modular, and production-ready</li>
        </ul>
        <div className="flexright">
          <Link to="/docs/productcard" class="get-started-btn">Get Started
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#ffffff"} fill={"none"}>
              <path d="M20.0001 11.9998L4.00012 11.9998" stroke="#ffffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.0003 17C15.0003 17 20.0002 13.3176 20.0002 12C20.0002 10.6824 15.0002 7 15.0002 7" stroke="#ffffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

    </>
  )
}

export default Introduction