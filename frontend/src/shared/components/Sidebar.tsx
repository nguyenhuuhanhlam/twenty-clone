import type { User } from 'firebase/auth';
import { ChevronLeft, ChevronRight, Home, Search, Settings, Users } from 'lucide-react';
import { logout } from '../../features/auth/services/auth_service';

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
    <aside className="sidebar" aria-label="Main navigation">
      <div className="workspace-switcher">
        <div className="workspace-mark">A</div>
        <div className="workspace-copy">
          <div className="workspace-name">TwentyClone</div>
          <div className="workspace-plan">Workspace</div>
        </div>
        <button
          className="sidebar-toggle"
          type="button"
          aria-label={isCollapsed ? 'Expand menu' : 'Collapse menu'}
          aria-expanded={!isCollapsed}
          onClick={onToggle}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <button className="search-button" type="button">
        <Search size={16} />
        <span>Search</span>
        <kbd>/</kbd>
      </button>

      <nav className="nav-group" aria-label="Workspace">
        <div className="nav-label">Workspace</div>
        <a className="nav-item" href="#home">
          <Home size={16} />
          <span>Home</span>
        </a>
      </nav>

      <nav className="nav-group" aria-label="Management">
        <div className="nav-label">Management</div>
        <a className="nav-item active" href="#users">
          <Users size={16} />
          <span>Users</span>
        </a>
      </nav>

      <div className="sidebar-footer">
        <button className="footer-action" type="button">
          <Settings size={16} />
          <span>Settings</span>
        </button>

        <button className="user-login" type="button" onClick={logout} title="Logout">
          {user.photoURL ? (
            <img className="avatar-img" src={user.photoURL} alt="" />
          ) : (
            <span className="avatar small">{getInitial(user.displayName || user.email)}</span>
          )}
          <span className="user-meta">
            <span className="user-name">{user.displayName || 'User'}</span>
            <span className="user-email">{user.email}</span>
          </span>
        </button>
      </div>
    </aside>
  );
}
