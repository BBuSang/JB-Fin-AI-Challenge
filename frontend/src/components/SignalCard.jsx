import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

function SignalCard({ status, recoveryRate, limit, onAction }) {
  const getSignalConfig = () => {
    if (status === 'approve' || recoveryRate >= 95) {
      return {
        icon: CheckCircle,
        title: '승인 권장',
        subtitle: '자동 승인 기준 충족',
        class: 'signal-approve',
        description: '회수확률이 95% 이상으로 자동 승인 정책에 부합합니다.',
        actions: [
          { label: '승인 실행', primary: true, action: 'approve' },
          { label: '상세 검토', primary: false, action: 'review' },
        ],
      };
    }
    if (status === 'review' || recoveryRate >= 80) {
      return {
        icon: AlertCircle,
        title: '검토 필요',
        subtitle: '은행원 판단 요청',
        class: 'signal-review',
        description: '회수확률이 80~95% 구간입니다. 추가 검토 후 결정해주세요.',
        actions: [
          { label: '승인', primary: true, action: 'approve' },
          { label: '보류', primary: false, action: 'hold' },
          { label: '거절', primary: false, action: 'reject' },
        ],
      };
    }
    return {
      icon: XCircle,
      title: '승인 미달',
      subtitle: '대안 연결 권장',
      class: 'signal-reject',
      description: '현재 조건으로는 승인이 어렵습니다. 대안을 안내해드립니다.',
      actions: [
        { label: '대안 보기', primary: true, action: 'alternatives' },
        { label: '재검토 요청', primary: false, action: 'retry' },
      ],
    };
  };

  const config = getSignalConfig();
  const Icon = config.icon;

  const formatMoney = (value) => {
    return new Intl.NumberFormat('ko-KR').format(value);
  };

  return (
    <div className={`signal-card ${config.class}`}>
      <div className="signal-header">
        <Icon size={32} className="signal-icon" />
        <div className="signal-title-group">
          <h3>{config.title}</h3>
          <span className="signal-subtitle">{config.subtitle}</span>
        </div>
      </div>

      <div className="signal-stats">
        <div className="signal-stat">
          <span className="stat-label">회수확률</span>
          <span className="stat-value">{recoveryRate}%</span>
        </div>
        <div className="signal-stat">
          <span className="stat-label">추천한도</span>
          <span className="stat-value">{formatMoney(limit)}원</span>
        </div>
      </div>

      <p className="signal-description">{config.description}</p>

      <div className="signal-actions">
        {config.actions.map((action, index) => (
          <button
            key={index}
            className={`signal-btn ${action.primary ? 'primary' : 'secondary'}`}
            onClick={() => onAction?.(action.action)}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SignalCard;
