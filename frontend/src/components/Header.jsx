import { Search, Bell } from 'lucide-react';

function Header() {
  return (
    <header className="header">
      <div className="search-bar">
        <Search size={18} />
        <input type="text" placeholder="사업자 번호 또는 고객명 검색..." />
      </div>
      <div className="user-info">
        <Bell size={20} />
        <div className="profile-img"></div>
        <span>김지점 은행원</span>
      </div>
    </header>
  );
}

export default Header;
