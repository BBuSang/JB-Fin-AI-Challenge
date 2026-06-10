import { FileText, Clock, RefreshCw, Phone, ArrowRight } from 'lucide-react';

function AlternativeOptions({ customerName, onSelect }) {
  const alternatives = [
    {
      id: 'policy',
      icon: FileText,
      title: '정책자금 연결',
      description: '소상공인 긴급경영안정자금 등 3개 정책 자격 충족',
      detail: '최대 5천만원 / 연 2.0%',
      highlight: true,
    },
    {
      id: 'defer',
      icon: Clock,
      title: '상환 유예',
      description: '기존 대출 상환 일정 조정으로 부담 완화',
      detail: '최대 6개월 유예 가능',
      highlight: false,
    },
    {
      id: 'retry',
      icon: RefreshCw,
      title: '정산 정상화 후 재신청',
      description: '다음 정산 사이클에 재검토 예약',
      detail: '예상 재검토일: 익월 15일',
      highlight: false,
    },
    {
      id: 'consult',
      icon: Phone,
      title: '전문 상담 연결',
      description: '소상공인 전문 상담사와 1:1 상담',
      detail: '평일 09:00~18:00',
      highlight: false,
    },
  ];

  return (
    <div className="alternative-options">
      <div className="alternatives-header">
        <h3>대안 안내</h3>
        <p>{customerName}님께 제안할 수 있는 대안입니다.</p>
      </div>
      <div className="alternatives-message">
        <span className="message-badge">AI 지점장</span>
        <p>"거절이 끝이 아닙니다. 함께 다른 방법을 찾아보겠습니다."</p>
      </div>
      <div className="alternatives-list">
        {alternatives.map((alt) => (
          <div
            key={alt.id}
            className={`alternative-item ${alt.highlight ? 'highlighted' : ''}`}
            onClick={() => onSelect?.(alt.id)}
          >
            <div className="alt-icon">
              <alt.icon size={24} />
            </div>
            <div className="alt-content">
              <h4>{alt.title}</h4>
              <p>{alt.description}</p>
              <span className="alt-detail">{alt.detail}</span>
            </div>
            <ArrowRight size={20} className="alt-arrow" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlternativeOptions;
