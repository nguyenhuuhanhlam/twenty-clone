import type { User } from 'firebase/auth';
import { ChevronLeft, ChevronRight, Home, Search, Settings, Users } from 'lucide-react';
import { logout } from '../../features/auth/services/authService';

type SidebarProps = {
  isCollapsed: boolean;
  user: User;
  onToggle: () => void;
};

function getInitial(value?: string | null) {
  return value?.trim().slice(0, 1).toUpperCase() || 'U';
}

export function Sidebar({ isCollapsed, user, onToggle }: SidebarProps) {
  return (
    <aside className="sidebar" aria-label="Điều hướng chính">
      <div className="workspace-switcher">
        <div className="workspace-mark">A</div>
        <div className="workspace-copy">
          <div className="workspace-name">TwentyClone</div>
          <div className="workspace-plan">Không gian</div>
        </div>
        <button
          className="sidebar-toggle"
          type="button"
          aria-label={isCollapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
          aria-expanded={!isCollapsed}
          onClick={onToggle}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <button className="search-button" type="button">
        <Search size={16} />
        <span>Tìm kiếm</span>
        <kbd>/</kbd>
      </button>

      <nav className="nav-group" aria-label="Không gian">
        <div className="nav-label">Không gian</div>
        <a className="nav-item" href="#home">
          <Home size={16} />
          <span>Nhà</span>
        </a>
        <a className="nav-item active" href="#people">
          <Users size={16} />
          <span>Liên hệ</span>
        </a>
      </nav>

      <div className="sidebar-footer">
        <button className="footer-action" type="button">
          <Settings size={16} />
          <span>Cài đặt</span>
        </button>

        <button className="user-login" type="button" onClick={logout} title="Đăng xuất">
          {user.photoURL ? (
            <img className="avatar-img" src={user.photoURL} alt="" />
          ) : (
            <span className="avatar small">{getInitial(user.displayName || user.email)}</span>
          )}
          <span className="user-meta">
            <span className="user-name">{user.displayName || 'Người dùng'}</span>
            <span className="user-email">{user.email}</span>
          </span>
        </button>
      </div>
    </aside>
  );
}
