// import { lazy, Suspense } from 'react'
// import { useParams, Link } from 'react-router-dom';

// const Cardone = lazy(() => import('@/Components/Cards/Cardone'));
// const Cardtwo = lazy(() => import('@/Components/Cards/Cardtwo'));

// function Docs() {
//   const { componentName } = useParams();

//   const renderComponent = () => {
//     switch (componentName) {
//       case 'Cardone':
//         return <Cardone />;
//       case 'Cardtwo':
//         return <Cardtwo />;
//       default:
//         return <div>Select a component</div>;
//     }
//   };

//   return (

//     <div className="flex">
//       <aside className="w-1/4 p-4 bg-gray-200">
//         <ul className="space-y-2">
//           <li>
//             <Link to="/docs/Cardone">Cardone</Link>
//           </li>
//           <li>
//             <Link to="/docs/Cardtwo">Cardtwo</Link>
//           </li>
//         </ul>
//       </aside>

//       <main className="flex-1 p-4 bg-white">
//         <Suspense fallback={<div>Loading...</div>}>
//           {renderComponent()}
//         </Suspense>
//       </main>
//     </div>
//   );
// }

// export default Docs

import { lazy, Suspense, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { components } from '@/data/components';

function Docs() {
  const { componentName } = useParams();
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showCode, setShowCode] = useState(false);
  const [rawCode, setRawCode] = useState('');
  const [Component, setComponent] = useState(null);

  // Reset states when component changes
  useEffect(() => {
    setShowCode(false);
    setRawCode('');
    setComponent(null);
  }, [componentName]);

  // Load component when route changes
  useEffect(() => {
    const selected = components
      .flatMap(cat => cat.items)
      .find(item => item.name.toLowerCase() === componentName?.toLowerCase());

    if (selected) {
      selected.import().then(module => {
        setComponent(() => module.default);
      });
    }
  }, [componentName]);

  // Load raw code when toggled
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

  return (
    <div className="flex">
      <aside className="w-1/4 p-4 bg-gray-200">
        <h2 className="font-bold mb-2">Components</h2>
        <ul className="space-y-2">
          {components.map(cat => (
            <li key={cat.category} className="border-b pb-2">
              <button
                onClick={() => setExpandedCategory(
                  expandedCategory === cat.category ? null : cat.category
                )}
                className="w-full text-left font-semibold"
              >
                {cat.category} {expandedCategory === cat.category ? '▲' : '▼'}
              </button>

              {expandedCategory === cat.category && (
                <ul className="pl-4 mt-1 space-y-1">
                  {cat.items.map(item => (
                    <li key={item.name}>
                      <Link
                        className="block py-1 underline text-blue-600 hover:text-blue-800"
                        to={item.path}
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-4 bg-white">
        {Component ? (
          <>
            <Component key={componentName} />
            
            <button
              className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
              onClick={() => setShowCode(prev => !prev)}
            >
              {showCode ? "Hide Code" : "Show Code"}
            </button>

            {showCode && rawCode && (
              <pre className="mt-4 p-4 bg-gray-100 rounded overflow-x-auto text-sm">
                <code>{rawCode}</code>
              </pre>
            )}
          </>
        ) : componentName ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            Please select a component from the sidebar
          </div>
        )}
      </main>
    </div>
  );
}

export default Docs;