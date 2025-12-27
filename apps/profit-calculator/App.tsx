'use client';

import { useState } from 'react';

export default function ProfitCalculatorApp() {
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [platformFeeRate, setPlatformFeeRate] = useState('15');
  const [shipping, setShipping] = useState('');
  const [result, setResult] = useState<{ profit: number; margin: number } | null>(null);

  const handleCalculate = () => {
    const p = parseFloat(price);
    const c = parseFloat(cost);
    const f = parseFloat(platformFeeRate);
    const s = parseFloat(shipping);

    if (isNaN(p) || isNaN(c) || isNaN(f) || isNaN(s)) {
      alert('请输入有效的数字');
      return;
    }

    const platformFee = (p * f) / 100;
    const profit = p - c - platformFee - s;
    const margin = (profit / p) * 100;

    setResult({ profit, margin });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>利润计算器</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        快速计算跨境电商利润与毛利率
      </p>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            售价 (USD)
          </label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="100.00"
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            成本 (USD)
          </label>
          <input
            type="number"
            step="0.01"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="50.00"
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            平台费率 (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={platformFeeRate}
            onChange={(e) => setPlatformFeeRate(e.target.value)}
            placeholder="15"
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            运费 (USD)
          </label>
          <input
            type="number"
            step="0.01"
            value={shipping}
            onChange={(e) => setShipping(e.target.value)}
            placeholder="10.00"
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </div>

        <button
          onClick={handleCalculate}
          style={{
            width: '100%',
            padding: '12px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          计算利润
        </button>
      </div>

      {result && (
        <div style={{
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
        }}>
          <h3 style={{ marginTop: 0 }}>计算结果</h3>
          <div style={{ fontSize: '18px', marginBottom: '10px' }}>
            <strong>利润:</strong>{' '}
            <span style={{ color: result.profit >= 0 ? '#28a745' : '#dc3545' }}>
              ${result.profit.toFixed(2)}
            </span>
          </div>
          <div style={{ fontSize: '18px' }}>
            <strong>毛利率:</strong>{' '}
            <span style={{ color: result.margin >= 0 ? '#28a745' : '#dc3545' }}>
              {result.margin.toFixed(2)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
