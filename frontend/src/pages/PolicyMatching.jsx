import { useEffect, useState } from 'react';
import { Filter, Download, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { api } from '../api';

function PolicyMatching() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    api.policyMatches().then(setPolicies).catch(console.error);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'matched':
        return <CheckCircle size={16} className="status-icon green" />;
      case 'pending':
        return <Clock size={16} className="status-icon yellow" />;
      case 'review':
        return <AlertCircle size={16} className="status-icon orange" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'matched':
        return '매칭 완료';
      case 'pending':
        return '검토 중';
      case 'review':
        return '추가 확인 필요';
      default:
        return '';
    }
  };

  return (
    <section className="content-body">
      <div className="page-title">
        <h2>정책자금 매칭</h2>
        <p>AI가 분석한 최적의 정책자금을 확인하세요.</p>
      </div>

      <div className="filter-bar">
        <div className="filter-group">
          <button
            className={`filter-btn ${selectedFilter === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('all')}
          >
            전체
          </button>
          <button
            className={`filter-btn ${selectedFilter === 'matched' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('matched')}
          >
            매칭 완료
          </button>
          <button
            className={`filter-btn ${selectedFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('pending')}
          >
            검토 중
          </button>
        </div>
        <div className="action-group">
          <button className="btn-icon">
            <Filter size={18} />
          </button>
          <button className="btn-icon">
            <Download size={18} />
          </button>
        </div>
      </div>

      <div className="policy-grid">
        {policies
          .filter((p) => selectedFilter === 'all' || p.status === selectedFilter)
          .map((policy) => (
            <div key={policy.id} className="card policy-card">
              <div className="policy-header">
                <div className="match-score">
                  <span className="score-value">{policy.matchScore}%</span>
                  <span className="score-label">매칭률</span>
                </div>
                <div className="policy-status">
                  {getStatusIcon(policy.status)}
                  <span>{getStatusText(policy.status)}</span>
                </div>
              </div>
              <h3 className="policy-name">{policy.name}</h3>
              <p className="policy-institution">{policy.institution}</p>
              <div className="policy-details">
                <div className="detail-item">
                  <span className="detail-label">한도</span>
                  <span className="detail-value">{policy.limit}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">금리</span>
                  <span className="detail-value">{policy.rate}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">마감</span>
                  <span className="detail-value">{policy.deadline}</span>
                </div>
              </div>
              <button className="btn-full primary">신청하기</button>
            </div>
          ))}
      </div>
    </section>
  );
}

export default PolicyMatching;
