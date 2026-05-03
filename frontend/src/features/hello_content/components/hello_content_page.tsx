import React, { useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Smile, Plus, Download } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Topbar } from '../../../shared/components/topbar';
import { SplitResizer } from '../../../shared/components/split_resizer';
import { useHelloContent } from '../hooks/use_hello_content';
import type { HelloContent } from '../types';
import { HelloContentTable } from './hello_content_table';
import { HelloContentDetailPanel } from './hello_content_detail_panel';

const MIN_PANEL_WIDTH = 320;
const MAX_PANEL_WIDTH = 620;

export function HelloContentPage({ group, title }: { group: string; title: string }) {
  const { items, loading } = useHelloContent();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [panelWidth, setPanelWidth] = useState(390);
  const [isResizing, setIsResizing] = useState(false);
  const layoutRef = useRef<HTMLDivElement>(null);

  const selectedItem = useMemo<HelloContent | null>(
    () => items.find((item) => item.id === selectedId) ?? null,
    [selectedId, items],
  );

  const isPanelOpen = Boolean(selectedItem);

  function resizePanel(clientX: number) {
    const layoutRect = layoutRef.current?.getBoundingClientRect();
    if (!layoutRect) return;

    const maxByViewport = Math.max(MIN_PANEL_WIDTH, Math.min(MAX_PANEL_WIDTH, layoutRect.width - 360));
    const nextWidth = Math.min(Math.max(layoutRect.right - clientX - 4, MIN_PANEL_WIDTH), maxByViewport);
    setPanelWidth(nextWidth);
  }

  return (
    <div className="content">
      <Topbar 
        breadcrumb={group} 
        title={title} 
        icon={<Smile size={16} className="text-blue-500" />}
        actions={
          <>
            <Button variant="outline" size="xs">
              <Download />
              Export
            </Button>
            <Button size="xs">
              <Plus />
              Add
            </Button>
          </>
        }
      />

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
          <section className="view-toolbar" aria-label="Table controls">
            <div className="view-tabs">
              <button className="view-tab active" type="button">
                All · {items.length}
              </button>
            </div>
            <div className="table-tools">
              <Button variant="ghost" size="xs" className="text-tool">
                Filter
              </Button>
              <Button variant="ghost" size="xs" className="text-tool">
                Sort
              </Button>
              <Button variant="ghost" size="xs" className="text-tool">
                Options
              </Button>
            </div>
          </section>

          <HelloContentTable
            items={items}
            loading={loading}
            selectedId={selectedId}
            onSelectItem={setSelectedId}
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

        <HelloContentDetailPanel item={selectedItem} onClose={() => setSelectedId(null)} />
      </div>
    </div>
  );
}
