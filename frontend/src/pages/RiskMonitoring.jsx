import { useState } from 'react';
import { AlertTriangle, TrendingDown, Clock, Shield, ChevronRight } from 'lucide-react';

function RiskMonitoring() {
  const [selectedRisk, setSelectedRisk] = useState('all');

  const riskCategories = [
    { id: 'all', label: '전체', count: 12 },
    { id: 'high', label: '고위험', count: 3 },
    { id: 'medium', label: '주의', count: 5 },
    { id: 'watch', label: '관찰', count: 4 },
  ];

  const riskAlerts = [
    {
      id: 1,
      level: 'high',
      customerName: '이철수',
      businessName: '행복카페',
      indicator: '매출 급감',
      change: '-45%',
      detail: '최근 2주간 매출이 전월 대비 45% 감소',
      detected: '2시간 전',
      suggestion: '정책자금 연결 권장',
    },
    {
      id: 2,
      level: 'high',
      customerName: '박진수',
      businessName: '맛있는분식',
      indicator: '연체 예상',
      change: 'D-7',
      detail: '현금흐름 분석 결과 7일 후 상환 어려움 예상',
      detected: '3시간 전',
      suggestion: '상환 유예 상담 권장',
    },
    {
      id: 3,
      level: 'medium',
      customerName: '최영희',
      businessName: '꽃집 봄',
      indicator: '결제 지연',
      change: '+3일',
      detail: '거래처 결제가 평균 대비 3일 지연',
      detected: '5시간 전',
      suggestion: '모니터링 지속',
    },
    {
      id: 4,
      level: 'medium',
      customerName: '김상호',
      businessName: '충장철물',
      indicator: '시즌 영향',
      change: '-20%',
      detail: '비수기 진입으로 매출 하락 예상',
      detected: '1일 전',
      suggestion: '단기 운영자금 검토',
    },
    {
      id: 5,
      level: 'watch',
      customerName: '이미경',
      businessName: '미경미용실',
      indicator: '상권 변화',
      change: '관찰',
      detail: '인근 대형마트 오픈으로 유동인구 변화 감지',
      detected: '2일 전',
      suggestion: '추이 관찰',
    },
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

  const filteredAlerts = selectedRisk === 'all'
    ? riskAlerts
    : riskAlerts.filter(a => a.level === selectedRisk);

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
            <span className="risk-count">3</span>
            <span className="risk-label">고위험</span>
          </div>
          <span className="risk-desc">즉시 조치 필요</span>
        </div>
        <div className="card risk-summary-card medium">
          <TrendingDown size={24} />
          <div className="risk-summary-content">
            <span className="risk-count">5</span>
            <span className="risk-label">주의</span>
          </div>
          <span className="risk-desc">면밀한 검토 필요</span>
        </div>
        <div className="card risk-summary-card watch">
          <Clock size={24} />
          <div className="risk-summary-content">
            <span className="risk-count">4</span>
            <span className="risk-label">관찰</span>
          </div>
          <span className="risk-desc">추이 모니터링</span>
        </div>
        <div className="card risk-summary-card safe">
          <Shield size={24} />
          <div className="risk-summary-content">
            <span className="risk-count">142</span>
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
          {filteredAlerts.map((alert) => (
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
