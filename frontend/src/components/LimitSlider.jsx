import { useState, useEffect } from 'react';
import { Info } from 'lucide-react';

function LimitSlider({
  settlementAmount = 3000000,
  refundRate = 0.05,
  buffer = 0.03,
  baseRecoveryRate = 98.5,
  onLimitChange
}) {
  const maxLimit = Math.floor(settlementAmount * (1 - refundRate - buffer));
  const [selectedLimit, setSelectedLimit] = useState(maxLimit);
  const [recoveryRate, setRecoveryRate] = useState(baseRecoveryRate);

  useEffect(() => {
    const ratio = selectedLimit / maxLimit;
    const newRate = baseRecoveryRate - (1 - ratio) * 5;
    setRecoveryRate(Math.max(0, Math.min(100, newRate)).toFixed(1));
    onLimitChange?.(selectedLimit, newRate);
  }, [selectedLimit, maxLimit, baseRecoveryRate, onLimitChange]);

  const formatMoney = (value) => {
    return new Intl.NumberFormat('ko-KR').format(value);
  };

  const getSignalStatus = () => {
    if (recoveryRate >= 95) return { label: '승인 권장', class: 'signal-approve' };
    if (recoveryRate >= 80) return { label: '검토 필요', class: 'signal-review' };
    return { label: '승인 미달', class: 'signal-reject' };
  };

  const signal = getSignalStatus();

  return (
    <div className="limit-slider-container">
      <div className="slider-header">
        <h4>선지급 한도 조정</h4>
        <div className={`signal-badge ${signal.class}`}>
          {signal.label}
        </div>
      </div>

      <div className="calculation-info">
        <div className="calc-row">
          <span>정산예정액</span>
          <span>{formatMoney(settlementAmount)}원</span>
        </div>
        <div className="calc-row">
          <span>환불률 ({(refundRate * 100).toFixed(0)}%)</span>
          <span>-{formatMoney(settlementAmount * refundRate)}원</span>
        </div>
        <div className="calc-row">
          <span>안전버퍼 ({(buffer * 100).toFixed(0)}%)</span>
          <span>-{formatMoney(settlementAmount * buffer)}원</span>
        </div>
        <div className="calc-row total">
          <span>최대 선지급 가능</span>
          <span>{formatMoney(maxLimit)}원</span>
        </div>
      </div>

      <div className="slider-control">
        <input
          type="range"
          min={0}
          max={maxLimit}
          step={10000}
          value={selectedLimit}
          onChange={(e) => setSelectedLimit(Number(e.target.value))}
          className="limit-range"
        />
        <div className="slider-labels">
          <span>0원</span>
          <span>{formatMoney(maxLimit)}원</span>
        </div>
      </div>

      <div className="slider-result">
        <div className="result-item">
          <span className="result-label">선지급 한도</span>
          <span className="result-value primary">{formatMoney(selectedLimit)}원</span>
        </div>
        <div className="result-item">
          <span className="result-label">
            예상 회수확률
            <Info size={12} className="info-icon" />
          </span>
          <span className={`result-value ${recoveryRate >= 95 ? 'success' : recoveryRate >= 80 ? 'warning' : 'danger'}`}>
            {recoveryRate}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default LimitSlider;
