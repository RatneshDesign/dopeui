import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { componentsData } from '@/Data/ComponentsData.js';
import "./Docs.css";
import Toast from './Toast.jsx';
import Lenis from 'lenis';

function Docs() {

  const [toast, setToast] = useState(null);
  const wrapperRef = useRef(null);
  const { componentName } = useParams();
  const [expandedCategory, setExpandedCategory] = useState(() => {
    const initialState = {};
    componentsData.forEach(cat => {
      initialState[cat.category] = true;
    });
    return initialState;
  });
  const [showCode, setShowCode] = useState(false);
  const [rawJsx, setRawJsx] = useState('');
  const [rawCss, setRawCss] = useState('');
  const [rawUsage, setRawUsage] = useState('');
  const [rawDepen, setRawDepen] = useState('');
  const [Component, setComponent] = useState(() => () => null);
  const [loading, setLoading] = useState(false);
  const [CurrentComponentName, setCurrentComponentName] = useState('');
  const sectionRef = useRef();
  const [activeIndexcode, setActiveIndexcode] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => setSidebarOpen(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: true,
      wrapper,
      content: wrapper,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    if (showCode && lenisRef.current) {
      setTimeout(() => {
        lenisRef.current.resize();
      }, 100);
    }
  }, [showCode]);

  useEffect(() => {
    document.title = `DopeUI${CurrentComponentName ? ` - ${CurrentComponentName}` : ' Documentation'}`;
  }, [CurrentComponentName]);

  // Load component
  useEffect(() => {
    const loadComponent = async () => {
      setLoading(true);
      setShowCode(false);
      setRawJsx('');
      setRawCss('');
      setCurrentComponentName('');

      try {
        // Default to Introduction when no component specified
        if (!componentName || componentName.toLowerCase() === 'introduction') {
          const mod = await import('./Introduction.jsx');
          setCurrentComponentName('Introduction');
          setComponent(() => mod.default);
        } else {
          // Find and load regular components
          const selected = componentsData
            .flatMap(cat => cat.items)
            .find(item => item.slug.toLowerCase() === componentName.toLowerCase());

          if (selected) {
            const module = await selected.import();
            setCurrentComponentName(selected.name);
            setComponent(() => module.default);
          } else {
            setCurrentComponentName("Not Found");
            setComponent(() => () => <div>Component not found</div>);
          }
        }
      } catch (error) {
        console.error("Failed to load component:", error);
        setCurrentComponentName('Error');
        setComponent(() => () => <div>Failed to load component</div>);
      } finally {
        setLoading(false);
      }
    };

    loadComponent();
  }, [componentName]);

  // Load raw code when toggled
  useEffect(() => {
    if (componentName && showCode) {
      const selected = componentsData
        .flatMap(cat => cat.items)
        .find(item => item.slug?.toLowerCase() === componentName?.toLowerCase());

      if (selected) {
        selected.raw().then(mod => setRawJsx(mod.default));

        if (selected.rawcss) {
          selected.rawcss().then(mod => setRawCss(mod.default));
        } else {
          setRawCss('');
        }

        if (selected.usage) {
          selected.usage().then(mod => setRawUsage(mod.default));
        } else {
          setRawUsage('');
        }
        if (selected.dependencies) {
          setRawDepen(selected.dependencies.join(', '));
        } else {
          setRawDepen('');
        }
      }
    }

    document.title = `DopeUI${componentName ? ` - ${CurrentComponentName}` : ' Documentation'}`;
  }, [componentName, showCode]);

  // useEffect(() => {
  //   if (showCode) {
  //     // Use setTimeout to ensure DOM update happens first
  //     setTimeout(() => {
  //       const container = document.querySelector('.code-container');
  //       if (container) {
  //         container.scrollTop = 0;
  //       }
  //     }, 50);
  //   }
  // }, [showCode, componentName]);
  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategory(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Animation variants
  const animations = {
    category: {
      open: { height: 'auto', opacity: 1 },
      closed: { height: 0, opacity: 0 }
    },
    item: {
      hidden: { opacity: 0, y: -5 },
      visible: { opacity: 1, y: 0 }
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    }
  };

  // Determine active component metadata
  const activeCategory = componentsData.find(cat =>
    cat.items.some(item => item.slug === componentName?.toLowerCase())
  );

  const activeComponent = activeCategory?.items.find(item =>
    item.slug === componentName?.toLowerCase()
  );

  //serach box
  const [searchshort, setSearchshort] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setSearchshort((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  useEffect(() => {

    if (searchshort && inputRef.current) {
      inputRef.current.focus();
    }
    const handleClick = (e) => {
      if (sectionRef.current && sectionRef.current.contains(e.target)) {
        setSearchshort(false);
      }
    };

    if (searchshort) {
      document.addEventListener("click", handleClick);
    }

    return () => document.removeEventListener("click", handleClick);
  }, [searchshort]);

  const filteredResults = useMemo(() => {
    if (searchTerm.trim() === "") return [];

    return componentsData
      .map((category) => {
        const matchedItems = category.items.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (matchedItems.length) {
          return {
            category: category.category,
            items: matchedItems,
          };
        }

        return null;
      })
      .filter(Boolean);
  }, [searchTerm]);

  const customStyle = {
    background: '#1e1e1e',
    borderRadius: '8px',
    padding: '1rem',
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setToast("Copied to clipboard");
    });
  };

  return (
    <div className="docs_container">
      <div
        ref={sectionRef}
        className='shortcutSection'
        style={{
          display: searchshort ? "flex" : "none",
          padding: "1em",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="innerWrapper_scs"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className='breadcrumb' style={{ height: "24px", alignItems: "center", justifyContent: "center", gap: "0.5em" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffffff"} fill={"none"}>
              <path d="M17 17L21 21" stroke="#ffffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z" stroke="#ffffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input
              type="text"
              placeholder="Search components..."
              value={searchTerm}
              ref={inputRef}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='serchbox'
            />
            <svg onClick={() => setSearchshort(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffffff"} fill={"none"}>
              <path d="M18 6L6.00081 17.9992M17.9992 18L6 6.00085" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>

          <div className="searchResults">
            {searchTerm.trim() !== "" && filteredResults.length === 0 && (
              <p>No results found.</p>
            )}

            {filteredResults.map((category) => (
              <div key={category.category}>
                <h4 style={{ margin: "10px 0 5px 0px" }}>{category.category}</h4>
                <ul>
                  {category.items.map((item) => (
                    <li key={item.slug}>
                      <div className="activeactionlink" style={{ marginRight: "5px" }}>
                        <svg style={{ transform: "translate(11px)" }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="16"
                          viewBox="0 0 18 16"
                          fill="none"
                        >
                          <path
                            d="M 1 1 V 2.52307 C 1 3.99043 1 4.72411 1.14533 5.338 C 1.94529 8.71723 5.90656 11.3676 10.9574 11.9028 C 11.8749 12 13.8068 12 16 12"
                            stroke="#3f3f3f"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14 15C14.6068 14.4102 17 12.8403 17 12C17 11.1597 14.6068 9.5898 14 9"
                            stroke="#3f3f3f"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <Link to={`${item.path}`} onClick={() => setSearchshort(false)} className='breadcrumb' style={{ transform: "translate(11px)", gap: "0.2em" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={19} height={19} color={"#ffffff"} fill={"none"} >
                          <path d="M15 2.5V4C15 5.41421 15 6.12132 15.4393 6.56066C15.8787 7 16.5858 7 18 7H19.5" stroke="#ffffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M4 16V8C4 5.17157 4 3.75736 4.87868 2.87868C5.75736 2 7.17157 2 10 2H14.1716C14.5803 2 14.7847 2 14.9685 2.07612C15.1522 2.15224 15.2968 2.29676 15.5858 2.58579L19.4142 6.41421C19.7032 6.70324 19.8478 6.84776 19.9239 7.03153C20 7.2153 20 7.41968 20 7.82843V16C20 18.8284 20 20.2426 19.1213 21.1213C18.2426 22 16.8284 22 14 22H10C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16Z" stroke="#ffffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <hr />
              </div>
            ))}
          </div>

        </div>


      </div>

      <nav className="navbar">
        <Link to={"/"}>
          <img src="/coloredlogo.svg" alt="logo" style={{ width: "100px" }} />
        </Link>

        <div className='breadcrumb' style={{ gap: "1em" }} >
          <div className="searchboxdesign" onClick={() => setSearchshort(true)}>
            <span>Search...</span>
            <div className="sb_shortcutnm">CTRL+K</div>
          </div>

          <a target='_blank' href=''>Github</a>
          {/* <a target='_blank' href='https://github.com/RatneshDesign'>Github</a> */}
          <button className="menu_toggle" onClick={toggleSidebar}>
            {isSidebarOpen ?
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#ffffff"} fill={"none"}>
                <path d="M18 6L6.00081 17.9992M17.9992 18L6 6.00085" stroke="#ffffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#ffffff"} fill={"none"}>
                <path d="M20 12L10 12" stroke="#ffffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 5L4 5" stroke="#ffffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 19L4 19" stroke="#ffffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

            }
          </button>
        </div>
      </nav>

      <div className="content_wrapper">

        <aside className={`docs_sidebar ${isSidebarOpen ? 'sidebar--open' : ''}`}>
          <h4 className="sidebar-title">Getting Started</h4>
          <Link
            to="/docs/introduction"
            style={{ marginTop: "0.75rem" }}
            className={`component-link ${!componentName || componentName.toLowerCase() === 'introduction'
              ? 'active'
              : ''
              }`}
            onClick={() => window.scrollTo(0, 0)}
          >
            Introduction
          </Link>

          <br />
          <h4 className="sidebar-title">Components</h4>
          <nav className="category-list">
            {componentsData.map(category => (
              <div key={category.category} className="category_item">
                <button
                  className="category_toggle"
                  onClick={() => toggleCategory(category.category)}
                >
                  {category.category}
                  <motion.span
                    animate={{ rotate: expandedCategory[category.category] ? 0 : 180 }}
                    transition={{ duration: 0.2 }}
                  >
                    {expandedCategory[category.category] ? <>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#ffffffff" fill="none">
                        <path d="M17.9997 12.5C17.9997 12.5 13.5807 18.5 11.9996 18.5C10.4185 18.5 5.99966 12.5 5.99966 12.5" stroke="#ffffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M17.9997 5.50005C17.9997 5.50005 13.5807 11.5 11.9996 11.5C10.4185 11.5 5.99966 5.5 5.99966 5.5" stroke="#ffffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </> : <>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16} color={"#ffffff"} fill={"none"}>
                        <path d="M17.9997 12.5C17.9997 12.5 13.5807 18.5 11.9996 18.5C10.4185 18.5 5.99966 12.5 5.99966 12.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M17.9997 5.50005C17.9997 5.50005 13.5807 11.5 11.9996 11.5C10.4185 11.5 5.99966 5.5 5.99966 5.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></>}
                  </motion.span>
                </button>

                <AnimatePresence>
                  {expandedCategory[category.category] && (
                    <motion.div
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={animations.category}
                      transition={{ duration: 0.2 }}
                      className="category-content"
                    >
                      {category.items.map(item => {
                        const isActive = componentName?.toLowerCase().trim() === item.slug?.toLowerCase().trim();

                        return (
                          <motion.div
                            key={item.slug}
                            variants={animations.item}
                            transition={{ duration: 0.15 }}
                          >
                            <Link
                              to={item.path}
                              className={`component-link ${isActive ? 'active' : ''}`}
                              onClick={() => {
                                window.scrollTo(0, 0);
                                closeSidebar();
                              }}
                            >
                              <div className="activeactionlink" style={{ marginRight: "5px" }}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="16"
                                  viewBox="0 0 18 16"
                                  fill="none"
                                >
                                  <path
                                    d="M 1 1 V 2.52307 C 1 3.99043 1 4.72411 1.14533 5.338 C 1.94529 8.71723 5.90656 11.3676 10.9574 11.9028 C 11.8749 12 13.8068 12 16 12"
                                    stroke={isActive ? "white" : "#3f3f3f"}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M14 15C14.6068 14.4102 17 12.8403 17 12C17 11.1597 14.6068 9.5898 14 9"
                                    stroke={isActive ? "white" : "#3f3f3f"}
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              {item.name}
                              {item.tag && (
                                <span className={`component-tag ${item.tag}`}>
                                  {item.tag}
                                </span>
                              )}
                            </Link>
                          </motion.div>
                        );
                      })}

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>
        </aside>

        <main className="docs_content" ref={wrapperRef}>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                className="loader-container"
                {...animations.fade}
              >
                <div className="loader-spinner"></div>
              </motion.div>
            ) : (
              <>
                {!componentName && (
                  <motion.div
                    key="introduction"
                    className="introduction-container"
                    {...animations.fade}
                  >
                    <Component />
                  </motion.div>
                )}

                {componentName && componentName.toLowerCase() !== 'introduction' && Component && (
                  <motion.div
                    key="component"
                    className="component-container"
                    {...animations.fade}
                  >
                    <div className="docs_contenant">
                      <span className="breadcrumb">
                        <span style={{ color: "#8c8c8c" }}>
                          Docs
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                          <defs />
                          <path fill="#ffffffff" d="M8.557,17.396 C8.719,17.274 9.2,16.91 9.478,16.694 C10.034,16.26 10.773,15.666 11.51,15.027 C12.251,14.384 12.972,13.708 13.502,13.108 C13.768,12.807 13.97,12.543 14.102,12.325 C14.226,12.119 14.251,11.998 14.251,11.998 C14.251,11.998 14.226,11.881 14.102,11.675 C13.97,11.457 13.768,11.193 13.502,10.892 C12.972,10.292 12.251,9.617 11.51,8.973 C10.773,8.334 10.034,7.741 9.478,7.306 C9.2,7.09 8.719,6.726 8.558,6.604 C8.224,6.359 8.152,5.889 8.398,5.555 C8.644,5.222 9.113,5.151 9.447,5.396 L9.449,5.398 C9.618,5.526 10.117,5.903 10.401,6.124 C10.97,6.568 11.731,7.178 12.494,7.841 C13.253,8.5 14.032,9.226 14.627,9.899 C14.923,10.235 15.19,10.575 15.386,10.901 C15.571,11.207 15.752,11.594 15.752,12 C15.752,12.407 15.571,12.793 15.386,13.099 C15.19,13.425 14.923,13.765 14.627,14.101 C14.032,14.774 13.253,15.5 12.494,16.159 C11.731,16.822 10.97,17.432 10.401,17.876 C10.117,18.097 9.618,18.474 9.449,18.602 L9.447,18.604 C9.114,18.849 8.644,18.778 8.398,18.445 C8.152,18.111 8.224,17.642 8.557,17.396 Z" />
                        </svg>

                        {activeCategory?.category}

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                          <defs />
                          <path fill="#ffffffff" d="M8.557,17.396 C8.719,17.274 9.2,16.91 9.478,16.694 C10.034,16.26 10.773,15.666 11.51,15.027 C12.251,14.384 12.972,13.708 13.502,13.108 C13.768,12.807 13.97,12.543 14.102,12.325 C14.226,12.119 14.251,11.998 14.251,11.998 C14.251,11.998 14.226,11.881 14.102,11.675 C13.97,11.457 13.768,11.193 13.502,10.892 C12.972,10.292 12.251,9.617 11.51,8.973 C10.773,8.334 10.034,7.741 9.478,7.306 C9.2,7.09 8.719,6.726 8.558,6.604 C8.224,6.359 8.152,5.889 8.398,5.555 C8.644,5.222 9.113,5.151 9.447,5.396 L9.449,5.398 C9.618,5.526 10.117,5.903 10.401,6.124 C10.97,6.568 11.731,7.178 12.494,7.841 C13.253,8.5 14.032,9.226 14.627,9.899 C14.923,10.235 15.19,10.575 15.386,10.901 C15.571,11.207 15.752,11.594 15.752,12 C15.752,12.407 15.571,12.793 15.386,13.099 C15.19,13.425 14.923,13.765 14.627,14.101 C14.032,14.774 13.253,15.5 12.494,16.159 C11.731,16.822 10.97,17.432 10.401,17.876 C10.117,18.097 9.618,18.474 9.449,18.602 L9.447,18.604 C9.114,18.849 8.644,18.778 8.398,18.445 C8.152,18.111 8.224,17.642 8.557,17.396 Z" />
                        </svg>

                        {activeComponent?.name || slug}
                      </span>

                      <h1 className="component_title">{activeComponent?.name || 'Component'}</h1>

                      <span className="component_description">
                        {activeComponent?.description}
                      </span>
                    </div>


                    <div className="view_toggle">
                      <div
                        className="toggle_highlight"
                        style={{ left: activeIndexcode === 0 ? "0%" : "50%" }}
                      ></div>
                      <button
                        className={`toggle_btn ${!showCode ? 'active' : ''}`}
                        onClick={() => { setShowCode(false); setActiveIndexcode(0) }}
                      >
                        Preview
                      </button>
                      <button
                        className={`toggle_btn ${showCode ? 'active' : ''}`}
                        onClick={() => { setShowCode(true); setActiveIndexcode(1) }}
                      >
                        Code
                      </button>
                    </div>
                    {toast && <Toast message={toast} onClose={() => setToast(null)} />}
                    {showCode ? (
                      <div className="code-container">

                        {rawDepen && (
                          <>
                            <h1 className="code-section-title">Dependencies</h1>
                            <SyntaxHighlighter language="bash" style={dracula} customStyle={customStyle}>
                              {`npm install ${rawDepen}`}
                            </SyntaxHighlighter>
                          </>
                        )}
                        {rawUsage && (
                          <>
                            <div className="breadcrumb" style={{ width: "100%", justifyContent: "space-between" }} >
                              <h1 className="code-section-title">Usage</h1>
                              <div className="clipboard" onClick={() => handleCopy(rawUsage)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#ffffff"} fill={"none"}>
                                  <path d="M7.99805 16H11.998M7.99805 11H15.998" stroke="#ffffffff" strokeWidth="1.5" strokeLinecap="round" />
                                  <path d="M7.5 3.5C5.9442 3.54667 5.01661 3.71984 4.37477 4.36227C3.49609 5.24177 3.49609 6.6573 3.49609 9.48836L3.49609 15.9944C3.49609 18.8255 3.49609 20.241 4.37477 21.1205C5.25345 22 6.66767 22 9.49609 22L14.4961 22C17.3245 22 18.7387 22 19.6174 21.1205C20.4961 20.241 20.4961 18.8255 20.4961 15.9944V9.48836C20.4961 6.6573 20.4961 5.24177 19.6174 4.36228C18.9756 3.71984 18.048 3.54667 16.4922 3.5" stroke="#ffffffff" strokeWidth="1.5" />
                                  <path d="M7.49609 3.75C7.49609 2.7835 8.2796 2 9.24609 2H14.7461C15.7126 2 16.4961 2.7835 16.4961 3.75C16.4961 4.7165 15.7126 5.5 14.7461 5.5H9.24609C8.2796 5.5 7.49609 4.7165 7.49609 3.75Z" stroke="#ffffffff" strokeWidth="1.5" strokeLinejoin="round" />
                                </svg>
                              </div>
                            </div>
                            <SyntaxHighlighter language="bash" style={dracula} customStyle={customStyle}>
                              {rawUsage}
                            </SyntaxHighlighter>
                          </>
                        )}
                        {rawUsage && (
                          <>
                            <div className="breadcrumb" style={{ width: "100%", justifyContent: "space-between" }} >
                              <h1 className="code-section-title">Code</h1>
                              <div className="clipboard" onClick={() => handleCopy(rawJsx)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#ffffff"} fill={"none"}>
                                  <path d="M7.99805 16H11.998M7.99805 11H15.998" stroke="#ffffffff" strokeWidth="1.5" strokeLinecap="round" />
                                  <path d="M7.5 3.5C5.9442 3.54667 5.01661 3.71984 4.37477 4.36227C3.49609 5.24177 3.49609 6.6573 3.49609 9.48836L3.49609 15.9944C3.49609 18.8255 3.49609 20.241 4.37477 21.1205C5.25345 22 6.66767 22 9.49609 22L14.4961 22C17.3245 22 18.7387 22 19.6174 21.1205C20.4961 20.241 20.4961 18.8255 20.4961 15.9944V9.48836C20.4961 6.6573 20.4961 5.24177 19.6174 4.36228C18.9756 3.71984 18.048 3.54667 16.4922 3.5" stroke="#ffffffff" strokeWidth="1.5" />
                                  <path d="M7.49609 3.75C7.49609 2.7835 8.2796 2 9.24609 2H14.7461C15.7126 2 16.4961 2.7835 16.4961 3.75C16.4961 4.7165 15.7126 5.5 14.7461 5.5H9.24609C8.2796 5.5 7.49609 4.7165 7.49609 3.75Z" stroke="#ffffffff" strokeWidth="1.5" strokeLinejoin="round" />
                                </svg>
                              </div>
                            </div>
                            <SyntaxHighlighter language="jsx" style={dracula} customStyle={customStyle}>
                              {rawJsx}
                            </SyntaxHighlighter>
                          </>
                        )}

                        {rawCss && (
                          <>
                            <div className="breadcrumb" style={{ width: "100%", justifyContent: "space-between" }} >
                              <h1 className="code-section-title">Styling</h1>
                              <div className="clipboard" onClick={() => handleCopy(rawCss)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#ffffff"} fill={"none"}>
                                  <path d="M7.99805 16H11.998M7.99805 11H15.998" stroke="#ffffffff" strokeWidth="1.5" strokeLinecap="round" />
                                  <path d="M7.5 3.5C5.9442 3.54667 5.01661 3.71984 4.37477 4.36227C3.49609 5.24177 3.49609 6.6573 3.49609 9.48836L3.49609 15.9944C3.49609 18.8255 3.49609 20.241 4.37477 21.1205C5.25345 22 6.66767 22 9.49609 22L14.4961 22C17.3245 22 18.7387 22 19.6174 21.1205C20.4961 20.241 20.4961 18.8255 20.4961 15.9944V9.48836C20.4961 6.6573 20.4961 5.24177 19.6174 4.36228C18.9756 3.71984 18.048 3.54667 16.4922 3.5" stroke="#ffffffff" strokeWidth="1.5" />
                                  <path d="M7.49609 3.75C7.49609 2.7835 8.2796 2 9.24609 2H14.7461C15.7126 2 16.4961 2.7835 16.4961 3.75C16.4961 4.7165 15.7126 5.5 14.7461 5.5H9.24609C8.2796 5.5 7.49609 4.7165 7.49609 3.75Z" stroke="#ffffffff" strokeWidth="1.5" strokeLinejoin="round" />
                                </svg>
                              </div>
                            </div>
                            <SyntaxHighlighter language="css" style={dracula} customStyle={customStyle}>
                              {rawCss}
                            </SyntaxHighlighter>
                          </>
                        )}


                      </div>

                    ) : (
                      <div className="component-preview-container">
                        <div className="component-preview">
                          <div className="overlaycomponent-preview"></div>
                          <Component />
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Show explicit Introduction if requested */}
                {componentName && componentName.toLowerCase() === 'introduction' && Component && (
                  <motion.div
                    key="introduction"
                    className="introduction-container"
                    {...animations.fade}
                  >
                    <Component />
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>

          <footer style={{ width: "100%", marginTop: "5vh" }} >
            <div className='footer_s1'>
              <span style={{ opacity: 0.7, fontWeight: 200, letterSpacing: 1 }}>Have any query ?</span>
            </div>
            <div className="footer_s2" style={{ gap: "0.5em" }} >
              <a target='_blank' href='https://www.linkedin.com/in/ratnesh-kumawat-6301b425b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'>Linkedin</a>
              <a target='_blank' href='https://www.instagram.com/_ratnesh.design?igsh=M2lzNmRveTQ5MXFo'>Instagram</a>
            </div>
          </footer>

        </main>


      </div>

    </div>
  );
}

export default Docs;