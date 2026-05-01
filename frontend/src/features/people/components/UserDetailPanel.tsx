import { MoreHorizontal, X } from 'lucide-react';
import type { UserRecord } from '../types';
import { formatDate, getInitial, getUserColor } from '../utils';

type UserDetailPanelProps = {
  user: UserRecord | null;
  onClose: () => void;
};

export function UserDetailPanel({ user, onClose }: UserDetailPanelProps) {
  return (
    <aside className="detail-panel" aria-hidden={!user} aria-label="Chi tiết bản ghi">
      {user ? (
        <>
          <div className="panel-header">
            <button className="tool-button" type="button" aria-label="Đóng panel" onClick={onClose}>
              <X size={16} />
            </button>
            <div className="panel-title">
              <span className="avatar tiny" style={{ background: getUserColor(user) }}>
                {getInitial(user.displayName)}
              </span>
              <strong>{user.displayName}</strong>
              <span>Tạo {formatDate(user.createdAt)}</span>
            </div>
            <button className="tool-button" type="button" aria-label="Thêm thao tác">
              <MoreHorizontal size={16} />
            </button>
          </div>

          <div className="record-tabs">
            <button className="record-tab active" type="button">
              Tổng quan
            </button>
            <button className="record-tab" type="button">
              Lịch sử
            </button>
            <button className="record-tab" type="button">
              Việc
            </button>
            <button className="record-tab" type="button">
              +4
            </button>
          </div>

          <div className="panel-body">
            <section className="detail-section">
              <h3>Thông tin</h3>
              <div className="field-group-title">Chung</div>
              <dl className="field-list">
                <div>
                  <dt>Email</dt>
                  <dd>
                    <span className="field-chip">{user.email || 'Chưa có'}</span>
                  </dd>
                </div>
                <div>
                  <dt>Đăng nhập</dt>
                  <dd>
                    <span className="field-chip">{user.authProvider}</span>
                  </dd>
                </div>
                <div>
                  <dt>Trạng thái</dt>
                  <dd>
                    <span className={user.isActive ? 'status-badge active' : 'status-badge inactive'}>
                      {user.isActive ? 'Đang bật' : 'Đã tắt'}
                    </span>
                  </dd>
                </div>
              </dl>
            </section>

            <section className="detail-section">
              <div className="field-group-title">Quyền</div>
              <dl className="field-list">
                <div>
                  <dt>Vai trò</dt>
                  <dd>{user.role || 'Chưa có'}</dd>
                </div>
                <div>
                  <dt>Tạo lúc</dt>
                  <dd>{formatDate(user.createdAt)}</dd>
                </div>
              </dl>
            </section>

            <div className="panel-bottom-bar">
              <button className="ghost-button compact" type="button">
                Tùy chọn
              </button>
              <button className="primary-button compact" type="button">
                Mở
              </button>
            </div>
          </div>
        </>
      ) : null}
    </aside>
  );
}
