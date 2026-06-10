import { X } from 'lucide-react';

function AnalysisModal({ isOpen, onClose, customer }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>AI 상세 분석 리포트</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="modal-body">
          {customer && (
            <>
              <div className="analysis-section">
                <h3>고객 정보</h3>
                <p><strong>상호:</strong> {customer.name}</p>
                <p><strong>정산예정액:</strong> {customer.amount}</p>
                <p><strong>회수확률:</strong> {customer.probability}</p>
              </div>
              <div className="analysis-section">
                <h3>AI 분석 근거</h3>
                <ul>
                  <li>최근 6개월 매출 추이: 안정적 상승</li>
                  <li>지역화폐 결제 비율: 35% (업종 평균 대비 높음)</li>
                  <li>과거 대출 상환 이력: 연체 없음</li>
                  <li>동종업계 폐업률: 낮음</li>
                </ul>
              </div>
              <div className="analysis-section">
                <h3>AI 판단</h3>
                <span className={`badge ${customer.status === '승인 권장' ? 'green' : 'yellow'}`}>
                  {customer.status}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnalysisModal;
