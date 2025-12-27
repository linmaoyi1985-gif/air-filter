import { useState, useMemo } from 'react';
import { getAppsByCategory, getAllCategories, searchApps } from '../registry';
import type { AppMeta } from '../types';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => ['All', ...getAllCategories()], []);

  const displayedApps = useMemo(() => {
    let apps: AppMeta[];

    if (searchQuery.trim()) {
      apps = searchApps(searchQuery);
    } else {
      const grouped = getAppsByCategory();
      apps = Array.from(grouped.values()).flat();
    }

    if (selectedCategory !== 'All') {
      apps = apps.filter(app => app.category === selectedCategory);
    }

    return apps;
  }, [searchQuery, selectedCategory]);

  const groupedApps = useMemo(() => {
    const grouped = new Map<string, AppMeta[]>();
    displayedApps.forEach(app => {
      const category = app.category;
      if (!grouped.has(category)) {
        grouped.set(category, []);
      }
      grouped.get(category)!.push(app);
    });
    return grouped;
  }, [displayedApps]);

  const navigateToApp = (slug: string) => {
    window.history.pushState({}, '', `/app/${slug}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '30px 20px',
        textAlign: 'center',
      }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '36px' }}>跨境电商AI应用</h1>
        <p style={{ margin: 0, fontSize: '16px', opacity: 0.9 }}>
          专业的跨境电商工具集合，助力卖家高效运营
        </p>
      </header>

      {/* Controls */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '30px 20px',
      }}>
        {/* Search Bar */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="搜索应用名称、描述或标签..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          />
        </div>

        {/* Category Filter */}
        <div style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '30px',
        }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '8px 16px',
                background: selectedCategory === category ? '#667eea' : 'white',
                color: selectedCategory === category ? 'white' : '#333',
                border: selectedCategory === category ? 'none' : '1px solid #ddd',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: selectedCategory === category ? 'bold' : 'normal',
                transition: 'all 0.2s',
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Apps Grid by Category */}
        {Array.from(groupedApps.entries()).map(([category, apps]) => (
          <div key={category} style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
              {category}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px',
            }}>
              {apps.map(app => (
                <div
                  key={app.slug}
                  onClick={() => navigateToApp(app.slug)}
                  style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                >
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#333' }}>
                    {app.name}
                  </h3>
                  <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '14px' }}>
                    {app.description}
                  </p>
                  {app.tags && app.tags.length > 0 && (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {app.tags.map(tag => (
                        <span
                          key={tag}
                          style={{
                            padding: '4px 8px',
                            background: '#f0f0f0',
                            borderRadius: '4px',
                            fontSize: '12px',
                            color: '#666',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {displayedApps.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#666',
          }}>
            <p style={{ fontSize: '18px' }}>未找到匹配的应用</p>
            <p style={{ fontSize: '14px' }}>请尝试其他搜索关键词或筛选条件</p>
          </div>
        )}
      </div>
    </div>
  );
}
