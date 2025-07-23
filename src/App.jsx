import React,{useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import Lenis from 'lenis';
import Home from './Pages/Home/Home'
import Docs from './Pages/Docs/Docs'

function App() {
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

    return () => lenis.destroy();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs/:componentName" element={<Docs />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </>
  )
}

export default App