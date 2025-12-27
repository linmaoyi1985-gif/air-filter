'use client';

import { useState } from 'react';

export default function CsvConverterApp() {
  const [input, setInput] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [rows, setRows] = useState<string[][]>([]);

  const handleParse = () => {
    const lines = input.split('\n').filter(line => line.trim());
    const parsed = lines.map(line => line.split(delimiter).map(cell => cell.trim()));
    setRows(parsed);
  };

  const handleExport = () => {
    const csv = rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'export.csv';
    link.click();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>CSV/TSV转换器</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        输入CSV或TSV文本，预览表格，导出为CSV文件
      </p>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>
          <input
            type="radio"
            checked={delimiter === ','}
            onChange={() => setDelimiter(',')}
          />
          CSV (逗号)
        </label>
        <label>
          <input
            type="radio"
            checked={delimiter === '\t'}
            onChange={() => setDelimiter('\t')}
          />
          TSV (制表符)
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>输入数据</h3>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`输入${delimiter === ',' ? 'CSV' : 'TSV'}数据...`}
          style={{
            width: '100%',
            height: '150px',
            padding: '10px',
            fontSize: '14px',
            fontFamily: 'monospace',
            border: '1px solid #ddd',
            borderRadius: '4px',
          }}
        />
        <button
          onClick={handleParse}
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
          解析预览
        </button>
      </div>

      {rows.length > 0 && (
        <div>
          <h3>表格预览</h3>
          <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              border: '1px solid #ddd',
            }}>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} style={{
                        padding: '8px',
                        border: '1px solid #ddd',
                        background: i === 0 ? '#f5f5f5' : 'white',
                        fontWeight: i === 0 ? 'bold' : 'normal',
                      }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={handleExport}
            style={{
              padding: '10px 20px',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            导出CSV
          </button>
        </div>
      )}
    </div>
  );
}
