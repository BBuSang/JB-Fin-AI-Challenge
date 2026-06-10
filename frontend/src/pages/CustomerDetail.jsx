import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Calendar, Store } from 'lucide-react';
import SignalCard from '../components/SignalCard';
import LimitSlider from '../components/LimitSlider';
import ShapChart from '../components/ShapChart';
import AlternativeOptions from '../components/AlternativeOptions';
import { api } from '../api';

function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [currentLimit, setCurrentLimit] = useState(2760000);
  const [currentRate, setCurrentRate] = useState(98.5);
  const [customer, setCustomer] = useState(null);
  const [shapFactors, setShapFactors] = useState(null);

  useEffect(() => {
    api.customer(id).then(setCustomer).catch(console.error);
    api.shap(id).then((d) => setShapFactors(d.factors)).catch(console.error);
  }, [id]);

  const handleAction = async (action) => {
    if (action === 'alternatives' || action === 'reject') {
      setShowAlternatives(true);
    } else if (action === 'approve') {
      try {
        const res = await api.approvePrepayment(id, currentLimit);
        alert(`${customer.name} 사장님 선지급 ${currentLimit.toLocaleString()}원 ${res.message}`);
        navigate('/');
      } catch (e) {
        alert('승인 처리 중 오류가 발생했습니다.');
      }
    }
  };

  const handleLimitChange = async (limit, _localRate) => {
    setCurrentLimit(limit);
    if (!customer) return;
    try {
      const res = await api.simulate({
        settlementAmount: customer.settlementAmount,
        requestedLimit: limit,
        baseRecoveryRate: customer.recoveryRate,
      });
      setCurrentRate(res.recoveryProbability);
    } catch (e) {
      console.error(e);
    }
  };

  if (!customer) {
    return (
      <section className="content-body">
        <p style={{ padding: '40px', textAlign: 'center' }}>고객 정보를 불러오는 중…</p>
      </section>
    );
  }

  return (
    <section className="content-body">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} /> 목록으로
      </button>

      <div className="customer-detail-header">
        <div className="customer-info-main">
          <h2>{customer.businessName}</h2>
          <span className="customer-name">{customer.name} 사장님</span>
        </div>
        <div className="customer-meta">
          <span><Store size={14} /> {customer.businessType}</span>
          <span><MapPin size={14} /> {customer.address}</span>
          <span><Phone size={14} /> {customer.phone}</span>
          <span><Calendar size={14} /> 개업 {customer.openDate}</span>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-left">
          <SignalCard
            status={customer.status}
            recoveryRate={currentRate}
            limit={currentLimit}
            onAction={handleAction}
          />

          {showAlternatives && (
            <AlternativeOptions
              customerName={customer.name}
              onSelect={(altId) => console.log('Selected:', altId)}
            />
          )}
        </div>

        <div className="detail-right">
          <div className="card">
            <LimitSlider
              settlementAmount={customer.settlementAmount}
              baseRecoveryRate={customer.recoveryRate}
              onLimitChange={handleLimitChange}
            />
          </div>

          <div className="card">
            <ShapChart factors={shapFactors} />
          </div>

          <div className="card customer-stats">
            <h4>고객 현황</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">월평균 매출</span>
                <span className="stat-value">{(customer.monthlyAvgSales / 10000).toLocaleString()}만원</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">지역화폐 비율</span>
                <span className="stat-value">{customer.localCurrencyRatio}%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">기존 대출</span>
                <span className="stat-value">{customer.previousLoans}건</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">상환 이력</span>
                <span className="stat-value success">{customer.repaymentHistory}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomerDetail;
