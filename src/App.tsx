import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import AppPage from './pages/AppPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Simple routing
  const path = currentPath.replace(/^\//, '').replace(/\/$/, '');

  if (!path || path === 'index.html') {
    return <HomePage />;
  }

  const appMatch = path.match(/^app\/([^/]+)$/);
  if (appMatch) {
    const slug = appMatch[1];
    return <AppPage slug={slug} />;
  }

  return <NotFoundPage />;
}

export default App;
