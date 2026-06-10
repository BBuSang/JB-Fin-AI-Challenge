import { AlertTriangle, TrendingUp, Gift, Clock, ChevronRight } from 'lucide-react';

const ICON_MAP = {
  warning: AlertTriangle,
  opportunity: TrendingUp,
  policy: Gift,
};

function AIAlertPanel({ alerts = [] }) {
  const getAlertStyle = (type) => {
    switch (type) {
      case 'warning': return 'alert-warning';
      case 'opportunity': return 'alert-opportunity';
      case 'policy': return 'alert-policy';
      default: return '';
    }
  };

  return (
    <div className="ai-alert-panel">
      <div className="alert-panel-header">
        <div className="alert-title">
          <span className="ai-badge">AI 지점장</span>
          <h3>오늘의 발견</h3>
        </div>
        <span className="alert-count">{alerts.length}건</span>
      </div>
      <div className="alert-list">
        {alerts.map((alert) => {
          const Icon = ICON_MAP[alert.type] || AlertTriangle;
          return (
            <div key={alert.id} className={`alert-item ${getAlertStyle(alert.type)}`}>
              <div className="alert-icon">
                <Icon size={18} />
              </div>
              <div className="alert-content">
                <div className="alert-header">
                  <strong>{alert.title}</strong>
                  <span className="alert-time">
                    <Clock size={12} /> {alert.time}
                  </span>
                </div>
                <p className="alert-message">{alert.message}</p>
              </div>
              <button className="alert-action">
                {alert.action} <ChevronRight size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AIAlertPanel;
