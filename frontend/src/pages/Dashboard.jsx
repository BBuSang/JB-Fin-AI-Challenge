import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import SummaryCard from '../components/SummaryCard';
import AIAlertPanel from '../components/AIAlertPanel';

function Dashboard() {
  const navigate = useNavigate();

  const customers = [
    {
      id: 1,
      name: '김영자',
      businessName: '대박백반',
      amount: 3000000,
      probability: 98.5,
      status: 'approve',
      statusLabel: '승인 권장',
    },
    {
      id: 2,
      name: '이철수',
      businessName: '행복카페',
      amount: 1500000,
      probability: 72.0,
      status: 'review',
      statusLabel: '추가 검토',
    },
    {
      id: 3,
      name: '박민수',
      businessName: '성실분식',
      amount: 2200000,
      probability: 95.2,
      status: 'approve',
      statusLabel: '승인 권장',
    },
    {
      id: 4,
      name: '최영희',
      businessName: '꽃집 봄',
      amount: 1800000,
      probability: 65.0,
      status: 'reject',
      statusLabel: '승인 미달',
    },
  ];

  const getProbClass = (prob) => {
    if (prob >= 95) return 'prob-high';
    if (prob >= 80) return 'prob-mid';
    return 'prob-low';
  };

  const getBadgeClass = (status) => {
    if (status === 'approve') return 'green';
    if (status === 'review') return 'yellow';
    return 'red';
  };

  const formatMoney = (value) => {
    return new Intl.NumberFormat('ko-KR').format(value) + '원';
  };

  return (
    <section className="content-body">
      <div className="page-title">
        <h2>AI 지점장 리포트</h2>
        <p>오늘의 분석된 소상공인 현황입니다.</p>
      </div>

      <div className="dashboard-layout">
        <div className="dashboard-main">
          <div className="grid-container">
            <SummaryCard
              title="오늘의 승인 추천"
              value="12건"
              trend="+2건 대비 어제"
              color="blue"
            />
            <SummaryCard
              title="검토 필요"
              value="3건"
              color="yellow"
            />
            <SummaryCard
              title="회수 완료 (오늘)"
              value="1.2억"
            />
          </div>

          <div className="card list-card">
            <div className="card-header">
              <h3>선지급 검토 대기열</h3>
              <button className="btn-text">
                전체보기 <ChevronRight size={16} />
              </button>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>고객명(상호)</th>
                  <th>지역화폐 정산예정</th>
                  <th>회수 확률</th>
                  <th>AI 판단</th>
                  <th>액션</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <div className="customer-cell">
                        <strong>{customer.businessName}</strong>
                        <span className="customer-name">{customer.name} 사장님</span>
                      </div>
                    </td>
                    <td>{formatMoney(customer.amount)}</td>
                    <td>
                      <span className={getProbClass(customer.probability)}>
                        {customer.probability}%
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getBadgeClass(customer.status)}`}>
                        {customer.statusLabel}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn-sm primary"
                        onClick={() => navigate(`/customer/${customer.id}`)}
                      >
                        상세분석
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dashboard-sidebar">
          <AIAlertPanel />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
