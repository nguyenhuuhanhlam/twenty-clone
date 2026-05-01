import { MoreHorizontal, X } from 'lucide-react';
import type { UserRecord } from '../types';
import { formatDate, getInitial, getUserColor } from '../utils';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type UserDetailPanelProps = {
  user: UserRecord | null;
  onClose: () => void;
};

export function UserDetailPanel({ user, onClose }: UserDetailPanelProps) {
  return (
    <aside className="detail-panel" aria-hidden={!user} aria-label="Chi tiết bản ghi">
      {user ? (
        <Tabs defaultValue="overview" className="flex h-full flex-col">
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

          <TabsList variant="line" className="record-tabs justify-start gap-6 px-4">
            <TabsTrigger value="overview" className="record-tab">
              Tổng quan
            </TabsTrigger>
            <TabsTrigger value="history" className="record-tab">
              Lịch sử
            </TabsTrigger>
            <TabsTrigger value="tasks" className="record-tab">
              Việc
            </TabsTrigger>
            <TabsTrigger value="more" className="record-tab">
              +4
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="flex-1 overflow-hidden">
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
                    <dd>
                      <span className="field-chip">{user.role || 'Chưa có'}</span>
                    </dd>
                  </div>
                </dl>
              </section>

              <section className="detail-section">
                <h3>Liên quan</h3>
                <div className="related-card">
                  <h3>Cơ hội</h3>
                  <div className="subtle">Chưa có cơ hội liên quan.</div>
                </div>
              </section>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="p-4 text-muted-foreground">
            Lịch sử thay đổi sẽ hiển thị ở đây.
          </TabsContent>
          
          <TabsContent value="tasks" className="p-4 text-muted-foreground">
            Các đầu việc liên quan sẽ hiển thị ở đây.
          </TabsContent>
        </Tabs>
      ) : (
        <div className="empty-panel">
          <p>Chọn một bản ghi để xem chi tiết</p>
        </div>
      )}
    </aside>
  );
}
