import { AlertTriangle, TrendingUp, Gift, Clock, ChevronRight } from 'lucide-react';

function AIAlertPanel() {
  const alerts = [
    {
      id: 1,
      type: 'warning',
      icon: AlertTriangle,
      title: '김철수 (행복카페)',
      message: '매출 급감 감지 - 연체 위험 사전 경고',
      time: '10분 전',
      action: '연착륙 검토',
    },
    {
      id: 2,
      type: 'opportunity',
      icon: TrendingUp,
      title: '박민수 (성실분식)',
      message: '정산예정 320만원 - 선지급 적합',
      time: '30분 전',
      action: '승인 검토',
    },
    {
      id: 3,
      type: 'policy',
      icon: Gift,
      title: '이영희 (꽃집 봄)',
      message: '소상공인 긴급경영자금 자격 충족',
      time: '1시간 전',
      action: '정책 연결',
    },
  ];

  const getAlertStyle = (type) => {
    switch (type) {
      case 'warning':
        return 'alert-warning';
      case 'opportunity':
        return 'alert-opportunity';
      case 'policy':
        return 'alert-policy';
      default:
        return '';
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
        {alerts.map((alert) => (
          <div key={alert.id} className={`alert-item ${getAlertStyle(alert.type)}`}>
            <div className="alert-icon">
              <alert.icon size={18} />
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
        ))}
      </div>
    </div>
  );
}

export default AIAlertPanel;
