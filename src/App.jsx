import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Lenis from 'lenis';
import Home from './Pages/Home/Home'
import Docs from './Pages/Docs/Docs'
import AudioVisualizer from './Components/Animation';

function App() {

  const location = useLocation();

  // useEffect(() => {
  //   if (!location.pathname.startsWith('/docs')) return;

  //   const contentEl = document.querySelector('.docs_content');
  //   if (!contentEl) return;

  //   const lenis = new Lenis({
  //     duration: 1.2,
  //     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //     smooth: true,
  //     smoothTouch: true,
  //     wrapper: contentEl,
  //     content: contentEl,
  //   });

  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);

  //   return () => lenis.destroy();
  // }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs/:componentName" element={<Docs />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/animation" element={<AudioVisualizer />} />
      </Routes>
    </>
  )
}

export default App