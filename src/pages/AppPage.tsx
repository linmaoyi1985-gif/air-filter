import { lazy, Suspense } from 'react';
import { getAppBySlug } from '../registry';
import NotFoundPage from './NotFoundPage';

interface AppPageProps {
  slug: string;
}

export default function AppPage({ slug }: AppPageProps) {
  const appMeta = getAppBySlug(slug);

  if (!appMeta) {
    return <NotFoundPage />;
  }

  // Dynamically import the app component
  const AppComponent = lazy(() => import(`../apps/${slug}/App.tsx`));

  const navigateHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #ddd',
        padding: '15px 20px',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}>
          <button
            onClick={navigateHome}
            style={{
              padding: '8px 16px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            ← 返回主页
          </button>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', color: '#333' }}>
              {appMeta.name}
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#666' }}>
              {appMeta.category}
            </p>
          </div>
        </div>
      </header>

      {/* App Content */}
      <Suspense
        fallback={
          <div style={{
            padding: '60px 20px',
            textAlign: 'center',
            color: '#666',
          }}>
            加载中...
          </div>
        }
      >
        <AppComponent />
      </Suspense>
    </div>
  );
}
