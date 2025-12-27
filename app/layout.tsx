import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '跨境电商AI应用',
  description: '专业的跨境电商工具集合,助力卖家高效运营',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
