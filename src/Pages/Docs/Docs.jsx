import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { components } from '@/data/components';
import "./Docs.css";

function Docs() {
  const { componentName } = useParams();
  const [expandedCategory, setExpandedCategory] = useState(() => {
    const initialState = {};
    components.forEach(cat => {
      initialState[cat.category] = true;
    });
    return initialState;
  });
  const [showCode, setShowCode] = useState(false);
  const [rawJsx, setRawJsx] = useState('');
  const [rawCss, setRawCss] = useState('');
  const [Component, setComponent] = useState(null);
  const [loading, setLoading] = useState(false);

  // Update document title
  useEffect(() => {
    document.title = `DopeUI${componentName ? ` - ${componentName}` : ' Documentation'}`;
  }, [componentName]);

  // Reset states when component changes
  useEffect(() => {
    setShowCode(false);
    setRawJsx('');
    setRawCss('');
    setLoading(true);
  }, [componentName]);

  // Load component
  useEffect(() => {
    const selected = components
      .flatMap(cat => cat.items)
      .find(item => item.name.toLowerCase() === componentName?.toLowerCase());

    if (selected) {
      setLoading(true);
      selected.import()
        .then(module => {
          setComponent(() => module.default);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [componentName]);

  // Load raw code when toggled
  useEffect(() => {
    if (componentName && showCode) {
      const selected = components
        .flatMap(cat => cat.items)
        .find(item => item.name.toLowerCase() === componentName?.toLowerCase());

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

  return (
    <div className="docs-container">
      <aside className="docs-sidebar">
        <h2 className="sidebar-title">Components</h2>
        <nav className="category-list">
          {components.map(category => (
            <div key={category.category} className="category-item">
              <button
                className="category-toggle"
                onClick={() => toggleCategory(category.category)}
              >
                {category.category}
                <motion.span
                  animate={{ rotate: expandedCategory[category.category] ? 0 : 180 }}
                  transition={{ duration: 0.2 }}
                >
                  {expandedCategory[category.category] ? <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffffff" fill="none">
                      <path d="M17.9997 12.5C17.9997 12.5 13.5807 18.5 11.9996 18.5C10.4185 18.5 5.99966 12.5 5.99966 12.5" stroke="#ffffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M17.9997 5.50005C17.9997 5.50005 13.5807 11.5 11.9996 11.5C10.4185 11.5 5.99966 5.5 5.99966 5.5" stroke="#ffffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </> : <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#ffffff"} fill={"none"}>
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
                    {category.items.map(item => (
                      <motion.div
                        key={item.name}
                        variants={animations.item}
                        transition={{ duration: 0.15 }}
                      >
                        <Link
                          to={item.path}
                          className={`component-link ${componentName === item.name ? 'active' : ''}`}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          {item.name}
                          {item.tag && (
                            <span className={`component-tag ${item.tag}`}>
                              {item.tag}
                            </span>
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>
      </aside>

      <main className="docs-content">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              className="loader-container"
              {...animations.fade}
            >
              <div className="loader-spinner"></div>
            </motion.div>
          ) : Component ? (
            <motion.div
              key="component"
              className="component-container"
              {...animations.fade}
            >
              <h1 className="component-title">{componentName}</h1>

              <div className="view-toggle">
                <button
                  className={`toggle-btn ${!showCode ? 'active' : ''}`}
                  onClick={() => setShowCode(false)}
                >
                  Preview
                </button>
                <button
                  className={`toggle-btn ${showCode ? 'active' : ''}`}
                  onClick={() => setShowCode(true)}
                >
                  Code
                </button>
              </div>

              {showCode ? (

                <div className="code-container">
                  <h1 className="code-section-title">Code</h1>
                  <SyntaxHighlighter
                    language="jsx"
                    style={nightOwl}
                    customStyle={{ margin: 0, borderRadius: '8px' }}
                  >
                    {rawJsx}
                  </SyntaxHighlighter>

                  {rawCss && (
                    <>
                      <h1 className="code-section-title">Styling</h1>
                      <SyntaxHighlighter
                        language="css"
                        style={nightOwl}
                        customStyle={{ margin: 0, borderRadius: '8px' }}
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
          ) : (
            <motion.div
              key="empty"
              className="empty-state"
              {...animations.fade}
            >
              Select a component from the sidebar
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default Docs;