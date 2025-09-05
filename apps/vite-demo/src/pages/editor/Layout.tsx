import React from 'react';
import { Link, useLocation, Outlet } from 'react-router';

const EditorLayout: React.FC = () => {
  const location = useLocation();

  const editorNavItems = [
    { path: '/editor', label: 'TextArea', icon: '📝' },
    { path: '/editor/epv', label: '拼写检查', icon: '🔍' },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">@nova-fe/editor</h1>
        <p className="page-description">
          一个基于 React 的高性能 TextArea，支持拼写检查、撤销重做等功能。
        </p>
      </div>

      {/* 子导航 */}
      <div className="demo-section">
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          {editorNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`btn ${
                location.pathname === item.path
                  ? 'btn-primary'
                  : 'btn-secondary'
              }`}
            >
              <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* 子页面内容 */}
      <Outlet />

      {/* 编辑器特性总结 */}
      <div className="demo-section">
        <h3 className="demo-title">TextArea 特性总结</h3>
        <div className="demo-grid">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">📝 TextArea</h4>
            </div>
            <div className="card-body">
              <ul style={{ paddingLeft: '1.2rem', color: '#666' }}>
                <li>基于原生 ContentEditable</li>
                <li>支持受控和非受控模式</li>
                <li>完整的样式自定义</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h4 className="card-title">↶ 撤销/重做</h4>
            </div>
            <div className="card-body">
              <ul style={{ paddingLeft: '1.2rem', color: '#666' }}>
                <li>use-undo 状态管理</li>
                <li>键盘快捷键支持</li>
                <li>原生编辑体验</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h4 className="card-title">🔍 拼写检查</h4>
            </div>
            <div className="card-body">
              <ul style={{ paddingLeft: '1.2rem', color: '#666' }}>
                <li>英语单词校验</li>
                <li>学术论文适用</li>
                <li>实时错误提示</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h4 className="card-title">⚡ 性能优化</h4>
            </div>
            <div className="card-body">
              <ul style={{ paddingLeft: '1.2rem', color: '#666' }}>
                <li>增量检查算法</li>
                <li>LRU 缓存机制</li>
                <li>Web Worker 后台处理</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorLayout;
