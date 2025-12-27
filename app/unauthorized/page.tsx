import { signOut } from '@/auth';

export default function UnauthorizedPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '90%',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚫</div>
        <h1 style={{ fontSize: '24px', marginBottom: '10px', color: '#333' }}>
          无权限访问
        </h1>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '30px' }}>
          您的账号不在授权白名单中。此应用仅供内部同事使用。
        </p>

        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/login' });
          }}
        >
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            返回登录
          </button>
        </form>

        <p style={{ fontSize: '12px', color: '#999', marginTop: '20px' }}>
          如需访问权限,请联系管理员
        </p>
      </div>
    </div>
  );
}
