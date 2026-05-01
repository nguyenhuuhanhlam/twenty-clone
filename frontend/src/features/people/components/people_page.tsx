import { useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SplitResizer } from '../../../shared/components/split_resizer';
import { Topbar } from '../../../shared/components/topbar';
import { useUsers } from '../hooks/use_users';
import type { UserRecord } from '../types';
import { UserDetailPanel } from './user_detail_panel';
import { UsersTable } from './users_table';

const MIN_PANEL_WIDTH = 320;
const MAX_PANEL_WIDTH = 620;

export function PeoplePage() {
  const { users, loading, error } = useUsers();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [panelWidth, setPanelWidth] = useState(390);
  const [isResizing, setIsResizing] = useState(false);
  const layoutRef = useRef<HTMLDivElement>(null);

  const selectedUser = useMemo<UserRecord | null>(
    () => users.find((user) => user.id === selectedUserId) ?? null,
    [selectedUserId, users],
  );

  const isPanelOpen = Boolean(selectedUser);

  function resizePanel(clientX: number) {
    const layoutRect = layoutRef.current?.getBoundingClientRect();
    if (!layoutRect) return;

    const maxByViewport = Math.max(MIN_PANEL_WIDTH, Math.min(MAX_PANEL_WIDTH, layoutRect.width - 360));
    const nextWidth = Math.min(Math.max(layoutRect.right - clientX - 4, MIN_PANEL_WIDTH), maxByViewport);
    setPanelWidth(nextWidth);
  }

  return (
    <>
      <Topbar />
      <div
        ref={layoutRef}
        className={[
          'records-layout',
          isPanelOpen ? 'panel-open' : '',
          isResizing ? 'resizing-split' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ '--detail-width': `${panelWidth}px` } as React.CSSProperties}
      >
        <div className="records-pane">
          <section className="view-toolbar" aria-label="Điều khiển bảng">
            <div className="view-tabs">
              <button className="view-tab active" type="button">
                Tất cả · {users.length}
              </button>
            </div>
            <div className="table-tools">
              <Button variant="ghost" className="text-tool">
                Lọc
              </Button>
              <button className="text-tool" type="button">
                Sắp xếp
              </button>
              <button className="text-tool" type="button">
                Tùy chọn
              </button>
            </div>
          </section>

          <UsersTable
            error={error}
            loading={loading}
            selectedUserId={selectedUserId}
            users={users}
            onSelectUser={setSelectedUserId}
          />
        </div>

        <SplitResizer
          disabled={!isPanelOpen}
          onResizeStart={(clientX) => {
            setIsResizing(true);
            resizePanel(clientX);
          }}
          onResizeMove={(clientX) => {
            if (isResizing) resizePanel(clientX);
          }}
          onResizeEnd={() => setIsResizing(false)}
        />

        <UserDetailPanel user={selectedUser} onClose={() => setSelectedUserId(null)} />
      </div>
    </>
  );
}
