import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { components } from '@/data/components';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';
import "./Docs.css"

function Docs() {
  const { componentName } = useParams();
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showCode, setShowCode] = useState(false);
  const [rawCode, setRawCode] = useState('');
  const [Component, setComponent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const baseTitle = "DopeUi - ";
    if (componentName) {
      document.title = `${baseTitle}${componentName}`;
    } else {
      document.title = `${baseTitle}Documentation`;
    }
  }, [componentName]);

  // reset states when componentss changes
  useEffect(() => {
    setShowCode(false);
    setRawCode('');
    setLoading(true);
  }, [componentName]);

  // load components when route changes
  useEffect(() => {
    const selected = components
      .flatMap(cat => cat.items)
      .find(item => item.name.toLowerCase() === componentName?.toLowerCase());

    if (selected) {
      setLoading(true);
      selected.import().then(module => {
        setComponent(() => module.default);
        setLoading(false);
      });
    }
  }, [componentName]);

  // load raw code when toggle
  useEffect(() => {
    if (componentName && showCode) {
      const selected = components
        .flatMap(cat => cat.items)
        .find(item => item.name.toLowerCase() === componentName?.toLowerCase());

      if (selected) {
        selected.raw().then(mod => {
          setRawCode(mod.default);
        });
      }
    }
  }, [componentName, showCode]);


  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 1, y: -10 },
    show: { opacity: 1, y: 0 }
  };

  const categoryVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05
      }
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05
      }
    }
  };

  return (
    <div className="docs_container">
      <aside className="sidebar">
        <h2 className="">Components</h2>
        <div className="category_list">
          {components.map(cat => (
            <div key={cat.category} className="category_item">
              <motion.button
                onClick={() =>
                  setExpandedCategory(prev => {
                    const current = prev?.[cat.category];
                    const newValue = current === undefined ? false : !current;
                    return { ...(prev || {}), [cat.category]: newValue };
                  })
                }
                className="category_toggle"
              >
                {cat.category}
                <motion.span
                  animate={{ rotate: expandedCategory?.[cat.category] ?? true ? 0 : 180 }}
                  transition={{ duration: 0.2 }}
                >
                  {expandedCategory?.[cat.category] ?? true ? '▲' : '▼'}
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {(expandedCategory?.[cat.category] ?? true) && (
                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={categoryVariants}
                    className="overflow-hidden"
                  >
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                      className="category-items"
                    >
                      {cat.items.map(item => (
                        <motion.div
                          key={item.name}
                          variants={itemVariants}
                        >
                          <Link
                            className="item_link"
                            to={item.path}
                            onClick={() => window.scrollTo(0, 0)}
                          >
                            {item.name}
                            {item.tag && (
                              <motion.span
                                className={`tag ${item.tag}`}
                                whileHover={{ scale: 1.1 }}
                              >
                                {item.tag}
                              </motion.span>
                            )}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </aside>

      <main className="main_content">
        <h1>{componentName}</h1>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="loader-wrapper"
            >
              <div className="loader"></div>
            </motion.div>
          ) : Component ? (
            <motion.div
              key="component"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='mainhero'
            >
              <div className="view_toggle_buttons">
                <button
                  className="toggle-preview-btn"
                  onClick={() => setShowCode(false)}
                  disabled={!showCode}
                >
                  Preview
                </button>
                <button
                  className="toggle-code-btn"
                  onClick={() => setShowCode(true)}
                  disabled={showCode}
                >
                  Code
                </button>

              </div>

              {showCode && rawCode ? (
                <SyntaxHighlighter language="jsx" style={nightOwl}>
                  {rawCode}
                </SyntaxHighlighter>
              ) : (
                <div className="backgroundforcompo">
                  <button
                    className="refresh_btn"
                  // onClick={() => setComponentKey(Date.now())}
                  >
                    o
                  </button>
                  <Component key={componentName} />
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="empty-state"
            >
              Please select a component from the sidebar
            </motion.div>
          )}
        </AnimatePresence>
        {showCode ?
          <div className="backgroundforcompo"></div>
          : <></>}
      </main>

    </div>

  );
}

export default Docs;