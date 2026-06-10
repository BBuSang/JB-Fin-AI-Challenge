function ShapChart({ factors }) {
  const defaultFactors = [
    { name: '최근 6개월 매출 안정성', value: 0.28, direction: 'positive' },
    { name: '지역화폐 결제 비율', value: 0.22, direction: 'positive' },
    { name: '과거 상환 이력', value: 0.18, direction: 'positive' },
    { name: '업종 평균 대비 매출', value: 0.12, direction: 'positive' },
    { name: '최근 카드 매출 변동', value: -0.08, direction: 'negative' },
    { name: '상권 위험도', value: -0.05, direction: 'negative' },
  ];

  const data = factors || defaultFactors;
  const maxValue = Math.max(...data.map(d => Math.abs(d.value)));

  return (
    <div className="shap-chart">
      <div className="shap-header">
        <h4>AI 판단 근거 (SHAP)</h4>
        <span className="shap-subtitle">회수확률에 영향을 미친 요인</span>
      </div>
      <div className="shap-bars">
        {data.map((factor, index) => (
          <div key={index} className="shap-bar-row">
            <span className="factor-name">{factor.name}</span>
            <div className="bar-container">
              <div className="bar-center-line"></div>
              <div
                className={`bar-fill ${factor.direction}`}
                style={{
                  width: `${(Math.abs(factor.value) / maxValue) * 45}%`,
                  [factor.direction === 'positive' ? 'left' : 'right']: '50%',
                }}
              ></div>
            </div>
            <span className={`factor-value ${factor.direction}`}>
              {factor.value > 0 ? '+' : ''}{(factor.value * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
      <div className="shap-legend">
        <span className="legend-item positive">● 승인에 긍정적</span>
        <span className="legend-item negative">● 승인에 부정적</span>
      </div>
    </div>
  );
}

export default ShapChart;
