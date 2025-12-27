'use client';

import { useState } from 'react';

export default function KeywordDedupApp() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleProcess = () => {
    const lines = input.split('\n').map(line => line.trim()).filter(line => line);
    const unique = Array.from(new Set(lines)).sort();
    setOutput(unique.join('\n'));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    alert('已复制到剪贴板！');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>关键词去重工具</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        输入多行关键词,自动去重并排序
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <h3>输入关键词(每行一个)</h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入关键词,每行一个..."
            style={{
              width: '100%',
              height: '400px',
              padding: '10px',
              fontSize: '14px',
              fontFamily: 'monospace',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
          <button
            onClick={handleProcess}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            去重排序
          </button>
        </div>

        <div>
          <h3>处理结果</h3>
          <textarea
            value={output}
            readOnly
            placeholder="处理结果会在这里显示..."
            style={{
              width: '100%',
              height: '400px',
              padding: '10px',
              fontSize: '14px',
              fontFamily: 'monospace',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: '#f9f9f9',
            }}
          />
          <button
            onClick={handleCopy}
            disabled={!output}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              background: output ? '#28a745' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: output ? 'pointer' : 'not-allowed',
              fontSize: '14px',
            }}
          >
            复制结果
          </button>
        </div>
      </div>
    </div>
  );
}
