import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darkCodeTheme } from '../../Themes/Darkcodetheme.js';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { componentsData } from '@/Data/ComponentsData.js';
import "./Docs.css";


function Docs() {
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

      // console.log("Component matched:", selected);

      if (selected) {
        // Load JSX code
        selected.raw().then(mod => setRawJsx(mod.default));

        // Load CSS code if available
        if (selected.rawcss) {
          selected.rawcss().then(mod => setRawCss(mod.default));
        } else {
          setRawCss('');
        }
      }
    }
    document.title = `DopeUI${componentName ? ` - ${CurrentComponentName}` : ' Documentation'}`;
  }, [componentName, showCode]);

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
            ☰
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

        <main className="docs_content">

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

                    {showCode ? (
                      <div className="code-container">
                        <h1 className="code-section-title">Code</h1>
                        <SyntaxHighlighter
                          language="jsx"
                          style={dracula}
                          // customStyle={{ margin: 0, borderRadius: '8px' }}
                          customStyle={customStyle}
                        >
                          {rawJsx}
                        </SyntaxHighlighter>

                        {rawCss && (
                          <>
                            <h1 className="code-section-title">Styling</h1>
                            <SyntaxHighlighter
                              language="css"
                              style={dracula}
                              customStyle={customStyle}

                            // customStyle={{ margin: 0, borderRadius: '8px' }}
                            >
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

        </main>
      </div>

    </div>
  );
}

export default Docs;