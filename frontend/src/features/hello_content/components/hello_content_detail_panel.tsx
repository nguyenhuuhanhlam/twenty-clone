import React from 'react';
import { MoreHorizontal, X, Smile } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { HelloContent } from '../types';

type HelloContentDetailPanelProps = {
  item: HelloContent | null;
  onClose: () => void;
};

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
];

export function HelloContentDetailPanel({ item, onClose }: HelloContentDetailPanelProps) {
  return (
    <aside className="detail-panel" aria-hidden={!item} aria-label="Record Details">
      {item ? (
        <Tabs defaultValue="overview" className="flex h-full flex-col min-w-0">
          <div className="panel-header">
            <button className="tool-button" type="button" aria-label="Close panel" onClick={onClose}>
              <X size={16} />
            </button>
            <div className="panel-title">
              <span className="avatar tiny bg-blue-600">
                <Smile size={12} className="text-white" />
              </span>
              <strong>{item.message}</strong>
              <span>Created {new Date(item.timestamp).toLocaleDateString()}</span>
            </div>
            <button className="tool-button" type="button" aria-label="More actions">
              <MoreHorizontal size={16} />
            </button>
          </div>

          <TabsList
            variant="line"
            className="flex w-full justify-start overflow-x-auto overflow-y-hidden whitespace-nowrap [&::-webkit-scrollbar]:hidden gap-2 px-4 border-b border-border-soft"
          >
            {TABS.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="record-tab">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="overview" className="h-full mt-0">
              <div className="panel-body">
                <section className="detail-section">
                  <h3>Information</h3>
                  <div className="field-group-title">General</div>
                  <dl className="field-list">
                    <div>
                      <dt>ID</dt>
                      <dd>
                        <span className="field-chip">{item.id}</span>
                      </dd>
                    </div>
                    <div>
                      <dt>Message</dt>
                      <dd>
                        <span className="field-chip">{item.message}</span>
                      </dd>
                    </div>
                    <div>
                      <dt>Timestamp</dt>
                      <dd>
                        <span className="field-chip">
                          {new Date(item.timestamp).toLocaleString()}
                        </span>
                      </dd>
                    </div>
                  </dl>
                </section>
              </div>
            </TabsContent>

            <TabsContent value="details" className="p-4 text-muted-foreground mt-0">
              Additional details for {item.message} will be displayed here.
            </TabsContent>
          </div>
        </Tabs>
      ) : (
        <div className="empty-panel">
          <p>Select a record to view details</p>
        </div>
      )}
    </aside>
  );
}
