import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

function SignalCard({ status, recoveryRate, limit, onAction }) {
  const getSignalConfig = () => {
    if (status === 'approve' || recoveryRate >= 95) {
      return {
        icon: CheckCircle,
        title: '자동승인 대상',
        subtitle: '스크리닝 통과 · 위험경보 없음',
        class: 'signal-approve',
        description: '네거티브 스크리닝(폐업·압류·중복양도) 통과, 위험경보 없음 — 사전승인 정책·한도 내 자동 집행 대상입니다.',
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
        subtitle: '위험 플래그 — 은행원 판단',
        class: 'signal-review',
        description: '위험 신호가 감지되어 은행원 검토로 라우팅되었습니다. SHAP 근거 확인 후 결정해주세요.',
        actions: [
          { label: '승인', primary: true, action: 'approve' },
          { label: '보류', primary: false, action: 'hold' },
          { label: '거절', primary: false, action: 'reject' },
        ],
      };
    }
    return {
      icon: XCircle,
      title: '결격 — 선지급 보류',
      subtitle: '낙인 없는 대안 연결',
      class: 'signal-reject',
      description: '결격 사유 또는 고위험으로 이번 선지급은 보류 권고 — 정책자금·연착륙 대안을 안내해드립니다.',
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
          <span className="stat-label">회수확률 (위험 참고)</span>
          <span className="stat-value">{recoveryRate}%</span>
        </div>
        <div className="signal-stat">
          <span className="stat-label">선지급 한도 (기계 산식)</span>
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
