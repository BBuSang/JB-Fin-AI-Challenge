import { LayoutDashboard, Users, AlertTriangle, Briefcase } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: '대시보드' },
    { path: '/customers', icon: Users, label: '소상공인 관리' },
    { path: '/risk', icon: AlertTriangle, label: '리스크 모니터링' },
    { path: '/policy', icon: Briefcase, label: '정책자금 매칭' },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <span className="logo-text">내일은행</span>
        <span className="logo-sub">AI Branch</span>
      </div>
      <nav className="menu">
        {menuItems.map((item) => (
          <div
            key={item.path}
            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
