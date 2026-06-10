import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import SummaryCard from '../components/SummaryCard';
import AIAlertPanel from '../components/AIAlertPanel';
import { api } from '../api';

function Dashboard() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [summary, setSummary] = useState({ cards: [], alerts: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.dashboardSummary(), api.prepayments()])
      .then(([s, list]) => {
        setSummary(s);
        setCustomers(list);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

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

  const formatMoney = (value) =>
    new Intl.NumberFormat('ko-KR').format(value) + '원';

  return (
    <section className="content-body">
      <div className="page-title">
        <h2>AI 지점장 리포트</h2>
        <p>오늘의 분석된 소상공인 현황입니다.</p>
      </div>

      <div className="dashboard-layout">
        <div className="dashboard-main">
          <div className="grid-container">
            {summary.cards.map((c, i) => (
              <SummaryCard key={i} title={c.title} value={c.value} trend={c.trend} color={c.color} />
            ))}
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
                {loading ? (
                  <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>불러오는 중…</td></tr>
                ) : customers.map((customer) => (
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
          <AIAlertPanel alerts={summary.alerts} />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
