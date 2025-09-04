import React from 'react';
import { Link } from 'react-router';
import { sleep } from '@nova-fe/utils';

const Home: React.FC = () => {
  const clickFn = async () => {
    await sleep(1000);
    console.log('Utils sleep function works!');
  };

  const features = [
    {
      title: 'Base UI 组件库',
      description:
        'Headless UI 设计理念，完全无样式的组件库，提供最大的自定义灵活性',
      icon: '🎨',
      path: '/base-ui',
      status: 'stable',
    },
    {
      title: '编辑器组件',
      description:
        '功能丰富的文本编辑器组件，支持多种编辑模式和扩展，包含EPV数据展示功能',
      icon: '📝',
      path: '/editor',
      status: 'beta',
    },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Nova Frontend 组件库演示</h1>
        <p className="page-description">
          欢迎来到 Nova Frontend
          组件库演示平台！这里展示了我们开发的各种前端组件和工具库。
          点击下方卡片探索不同的组件功能。
        </p>
      </div>

      <div className="demo-grid">
        {features.map((feature) => (
          <div key={feature.path} className="card">
            <div className="card-header">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{feature.icon}</span>
                  <h3 className="card-title">{feature.title}</h3>
                </div>
                <span
                  className={`status-tag status-${feature.status === 'stable' ? 'success' : feature.status === 'beta' ? 'warning' : 'error'}`}
                >
                  {feature.status}
                </span>
              </div>
            </div>
            <div className="card-body">
              <p style={{ marginBottom: '1rem' }}>{feature.description}</p>
              <Link to={feature.path} className="btn btn-primary">
                查看演示 →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="demo-section">
        <h3 className="demo-title">工具函数测试</h3>
        <p className="demo-description">
          测试 @nova-fe/utils 包中的 sleep 函数
        </p>
        <div className="demo-content">
          <button className="btn btn-secondary" onClick={clickFn}>
            测试 Sleep 函数 (1秒延迟)
          </button>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
            点击按钮后查看控制台输出
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
