import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Calendar, Store } from 'lucide-react';
import SignalCard from '../components/SignalCard';
import LimitSlider from '../components/LimitSlider';
import ShapChart from '../components/ShapChart';
import AlternativeOptions from '../components/AlternativeOptions';

function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [currentLimit, setCurrentLimit] = useState(2760000);
  const [currentRate, setCurrentRate] = useState(98.5);

  // 샘플 데이터 (실제로는 API에서 가져옴)
  const customer = {
    id: 1,
    name: '김영자',
    businessName: '대박백반',
    businessType: '일반음식점',
    address: '광주 동구 충장로 123',
    phone: '010-1234-5678',
    openDate: '2018-03-15',
    settlementAmount: 3000000,
    settlementDate: '2024-02-15',
    recoveryRate: 98.5,
    status: 'approve',
    monthlyAvgSales: 12500000,
    localCurrencyRatio: 35,
    previousLoans: 2,
    repaymentHistory: '정상',
  };

  const handleAction = (action) => {
    if (action === 'alternatives' || action === 'reject') {
      setShowAlternatives(true);
    } else if (action === 'approve') {
      alert(`${customer.name} 사장님 선지급 ${currentLimit.toLocaleString()}원 승인 처리되었습니다.`);
      navigate('/');
    }
  };

  const handleLimitChange = (limit, rate) => {
    setCurrentLimit(limit);
    setCurrentRate(rate);
  };

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
              onSelect={(id) => console.log('Selected:', id)}
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
            <ShapChart />
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
