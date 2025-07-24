import "./intro.css"
import { Link } from "react-router-dom"
function Introduction() {
  return (
    <>
      <h1>

        Introduction
      </h1>

      <section class="dopeui-intro">
        <h1><span>DopeUI</span> – Build fast. Build clean.</h1>
        <p>
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

        <Link to="/docs/productcard" class="get-started-btn">Get Started</Link>
      </section>

    </>
  )
}

export default Introduction