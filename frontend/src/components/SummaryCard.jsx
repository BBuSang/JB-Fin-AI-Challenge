import { TrendingUp } from 'lucide-react';

function SummaryCard({ title, value, trend, color = '' }) {
  return (
    <div className={`card summary-card ${color}`}>
      <h3>{title}</h3>
      <p className="stat">{value}</p>
      {trend && (
        <span className="trend">
          <TrendingUp size={14} /> {trend}
        </span>
      )}
    </div>
  );
}

export default SummaryCard;
