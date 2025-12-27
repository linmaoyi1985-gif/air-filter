'use client';

import { useState } from 'react';

interface Keyword {
  keyword: string;
  rank: number | null;
  search_volume: number | null;
  cpc: number | null;
}

interface ApiResponse {
  asin: string;
  keywords: Keyword[];
  error?: string;
}

export default function AsinKeywordsApp() {
  const [asin, setAsin] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    // Reset states
    setError('');
    setResult(null);

    // Validate ASIN
    const trimmedAsin = asin.trim();
    if (!trimmedAsin) {
      setError('请输入 ASIN');
      return;
    }

    if (trimmedAsin.length !== 10) {
      setError('ASIN 长度应为 10 位字符');
      return;
    }

    setLoading(true);

    try {
      // Call server-side n8n API
      const response = await fetch('/api/n8n/trigger', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workflow: 'asin_keywords',
          payload: { asin: trimmedAsin },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API 请求失败: ${response.status} ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '请求失败,请检查网络连接和 API 配置');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (!result || !result.keywords.length) return;

    const headers = ['Keyword', 'Rank', 'Search Volume', 'CPC'];
    const rows = result.keywords.map(k => [
      k.keyword,
      k.rank !== null ? k.rank : '',
      k.search_volume !== null ? k.search_volume : '',
      k.cpc !== null ? k.cpc : '',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `asin-${result.asin}-keywords.csv`;
    link.click();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>ASIN → 关键词(DataForSEO)</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        输入 Amazon ASIN,获取该产品在美国站点的排名关键词列表(数据来源:DataForSEO)
      </p>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          输入 ASIN(10位字符)
        </label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={asin}
            onChange={(e) => setAsin(e.target.value.toUpperCase())}
            placeholder="例如:B08N5WRWNW"
            maxLength={10}
            style={{
              flex: 1,
              padding: '10px',
              fontSize: '14px',
              fontFamily: 'monospace',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              padding: '10px 30px',
              background: loading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            {loading ? '查询中...' : '查询关键词'}
          </button>
        </div>
      </div>

      {error && (
        <div
          style={{
            background: '#f8d7da',
            border: '1px solid #f5c6cb',
            borderRadius: '4px',
            padding: '15px',
            marginBottom: '20px',
            color: '#721c24',
          }}
        >
          <strong>错误:</strong> {error}
        </div>
      )}

      {result && result.keywords.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ margin: 0 }}>
              关键词结果(共 {result.keywords.length} 个)
            </h3>
            <button
              onClick={handleExport}
              style={{
                padding: '8px 20px',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              导出 CSV
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                border: '1px solid #ddd',
                background: 'white',
              }}
            >
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd', fontWeight: 'bold' }}>
                    Keyword
                  </th>
                  <th style={{ padding: '12px', textAlign: 'center', border: '1px solid #ddd', fontWeight: 'bold', width: '100px' }}>
                    Rank
                  </th>
                  <th style={{ padding: '12px', textAlign: 'center', border: '1px solid #ddd', fontWeight: 'bold', width: '150px' }}>
                    Search Volume
                  </th>
                  <th style={{ padding: '12px', textAlign: 'center', border: '1px solid #ddd', fontWeight: 'bold', width: '100px' }}>
                    CPC
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.keywords.map((kw, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                      {kw.keyword}
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>
                      {kw.rank !== null ? kw.rank : '-'}
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>
                      {kw.search_volume !== null ? kw.search_volume.toLocaleString() : '-'}
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>
                      {kw.cpc !== null ? `$${kw.cpc.toFixed(2)}` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {result && result.keywords.length === 0 && (
        <div
          style={{
            background: '#e7f3ff',
            border: '1px solid #b3d9ff',
            borderRadius: '4px',
            padding: '15px',
            textAlign: 'center',
          }}
        >
          未找到关键词数据
        </div>
      )}
    </div>
  );
}
