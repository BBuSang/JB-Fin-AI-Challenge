import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import PolicyMatching from './pages/PolicyMatching';
import CustomerDetail from './pages/CustomerDetail';
import RiskMonitoring from './pages/RiskMonitoring';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="admin-container">
        <Sidebar />
        <main className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/policy" element={<PolicyMatching />} />
            <Route path="/customer/:id" element={<CustomerDetail />} />
            <Route path="/customers" element={<ComingSoon title="소상공인 관리" />} />
            <Route path="/risk" element={<RiskMonitoring />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function ComingSoon({ title }) {
  return (
    <section className="content-body">
      <div className="page-title">
        <h2>{title}</h2>
        <p>해당 기능은 준비 중입니다.</p>
      </div>
      <div className="card coming-soon-card">
        <p>곧 서비스가 제공될 예정입니다.</p>
      </div>
    </section>
  );
}

export default App;
