import { useEffect, useState } from 'react';
import { AlertTriangle, TrendingDown, Clock, Shield, ChevronRight } from 'lucide-react';
import { api } from '../api';

function RiskMonitoring() {
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [data, setData] = useState({ summary: [], alerts: [] });

  useEffect(() => {
    api.risks(selectedRisk).then(setData).catch(console.error);
  }, [selectedRisk]);

  const summaryById = Object.fromEntries((data.summary || []).map((s) => [s.id, s.count]));

  const riskCategories = [
    { id: 'all', label: '전체', count: summaryById.all ?? 0 },
    { id: 'high', label: '고위험', count: summaryById.high ?? 0 },
    { id: 'medium', label: '주의', count: summaryById.medium ?? 0 },
    { id: 'watch', label: '관찰', count: summaryById.watch ?? 0 },
  ];

  const getLevelStyle = (level) => {
    switch (level) {
      case 'high': return 'risk-high';
      case 'medium': return 'risk-medium';
      case 'watch': return 'risk-watch';
      default: return '';
    }
  };

  const getLevelLabel = (level) => {
    switch (level) {
      case 'high': return '고위험';
      case 'medium': return '주의';
      case 'watch': return '관찰';
      default: return '';
    }
  };

  return (
    <section className="content-body">
      <div className="page-title">
        <h2>리스크 모니터링</h2>
        <p>AI가 감지한 잠재적 위험 요소를 확인하세요.</p>
      </div>

      <div className="risk-summary-grid">
        <div className="card risk-summary-card high">
          <AlertTriangle size={24} />
          <div className="risk-summary-content">
            <span className="risk-count">{summaryById.high ?? 0}</span>
            <span className="risk-label">고위험</span>
          </div>
          <span className="risk-desc">즉시 조치 필요</span>
        </div>
        <div className="card risk-summary-card medium">
          <TrendingDown size={24} />
          <div className="risk-summary-content">
            <span className="risk-count">{summaryById.medium ?? 0}</span>
            <span className="risk-label">주의</span>
          </div>
          <span className="risk-desc">면밀한 검토 필요</span>
        </div>
        <div className="card risk-summary-card watch">
          <Clock size={24} />
          <div className="risk-summary-content">
            <span className="risk-count">{summaryById.watch ?? 0}</span>
            <span className="risk-label">관찰</span>
          </div>
          <span className="risk-desc">추이 모니터링</span>
        </div>
        <div className="card risk-summary-card safe">
          <Shield size={24} />
          <div className="risk-summary-content">
            <span className="risk-count">{summaryById.safe ?? 0}</span>
            <span className="risk-label">정상</span>
          </div>
          <span className="risk-desc">이상 없음</span>
        </div>
      </div>

      <div className="risk-filter-bar">
        {riskCategories.map((cat) => (
          <button
            key={cat.id}
            className={`filter-btn ${selectedRisk === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedRisk(cat.id)}
          >
            {cat.label} <span className="filter-count">{cat.count}</span>
          </button>
        ))}
      </div>

      <div className="card">
        <div className="risk-alert-list">
          {(data.alerts || []).map((alert) => (
            <div key={alert.id} className={`risk-alert-item ${getLevelStyle(alert.level)}`}>
              <div className="risk-level-badge">
                {getLevelLabel(alert.level)}
              </div>
              <div className="risk-alert-main">
                <div className="risk-alert-header">
                  <strong>{alert.businessName}</strong>
                  <span className="risk-customer-name">({alert.customerName} 사장님)</span>
                </div>
                <div className="risk-indicator">
                  <span className="indicator-name">{alert.indicator}</span>
                  <span className="indicator-change">{alert.change}</span>
                </div>
                <p className="risk-detail">{alert.detail}</p>
              </div>
              <div className="risk-alert-action">
                <span className="risk-detected">{alert.detected}</span>
                <div className="risk-suggestion">
                  <span className="suggestion-label">AI 제안</span>
                  <span className="suggestion-text">{alert.suggestion}</span>
                </div>
                <button className="btn-sm primary">
                  조치하기 <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RiskMonitoring;
