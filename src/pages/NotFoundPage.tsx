export default function NotFoundPage() {
  const navigateHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5f7fa',
      padding: '20px',
    }}>
      <h1 style={{ fontSize: '72px', margin: '0 0 20px 0', color: '#667eea' }}>
        404
      </h1>
      <h2 style={{ fontSize: '24px', margin: '0 0 10px 0', color: '#333' }}>
        页面未找到
      </h2>
      <p style={{ fontSize: '16px', margin: '0 0 30px 0', color: '#666' }}>
        抱歉，您访问的应用不存在
      </p>
      <button
        onClick={navigateHome}
        style={{
          padding: '12px 24px',
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        返回主页
      </button>
    </div>
  );
}
