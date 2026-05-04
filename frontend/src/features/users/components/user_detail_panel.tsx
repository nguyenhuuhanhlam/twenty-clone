import * as React from 'react';
import { MoreHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { UserRecord } from '../types';
import { formatDate, getInitial, getUserColor } from '../utils';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { SmartTabsList } from '@/shared/components/smart_tabs';

type UserDetailPanelProps = {
	user: UserRecord | null;
	onClose: () => void;
};

const ALL_TABS = [
	{ id: 'overview', label: 'Overview' },
	{ id: 'history', label: 'History' },
	{ id: 'tasks', label: 'Tasks' },
	{ id: 'activities', label: 'Activities' },
	{ id: 'files', label: 'Files' },
	{ id: 'notes', label: 'Notes' },
	{ id: 'emails', label: 'Emails' },
];

export function UserDetailPanel({ user, onClose }: UserDetailPanelProps) {
	const [activeTab, setActiveTab] = React.useState('overview');

	return (
		<aside className="detail-panel" aria-hidden={!user} aria-label="Chi tiết bản ghi">
			{user ? (
				<Tabs value={activeTab} onValueChange={setActiveTab} className="flex h-full flex-col min-w-0">
					<div className="panel-header">
						<Button variant="ghost" size="icon-xs" aria-label="Đóng panel" onClick={onClose}>
							<X />
						</Button>
						<div className="panel-title">
							<span className={`avatar tiny ${user.isActive ? 'active' : 'inactive'}`}>
								{getInitial(user.displayName)}
							</span>
							<strong>{user.displayName}</strong>
						</div>
						<Button variant="ghost" size="icon-xs" aria-label="More actions">
							<MoreHorizontal />
						</Button>
					</div>

					<SmartTabsList 
						tabs={ALL_TABS} 
						activeTab={activeTab} 
						onTabChange={setActiveTab} 
					/>

					<div className="flex-1 overflow-hidden">
						<TabsContent value="overview" className="h-full mt-0">
							<div className="panel-body">
								<section className="detail-section">
									<h3>Information</h3>
									<div className="field-group-title">General</div>
									<dl className="field-list">
										<div>
											<dt>Email</dt>
											<dd>
												<span className="field-chip">{user.email || 'None'}</span>
											</dd>
										</div>
										<div>
											<dt>Sign-in</dt>
											<dd>
												<span className="field-chip">{user.authProvider}</span>
											</dd>
										</div>
										<div>
											<dt>Status</dt>
											<dd>
												<span className={user.isActive ? 'status-badge active' : 'status-badge inactive'}>
													{user.isActive ? 'Active' : 'Inactive'}
												</span>
											</dd>
										</div>
									</dl>
								</section>

								<section className="detail-section">
									<div className="field-group-title">Permissions</div>
									<dl className="field-list">
										<div>
											<dt>Role</dt>
											<dd>
												<span className="field-chip">{user.role || 'None'}</span>
											</dd>
										</div>
									</dl>
								</section>

								<section className="detail-section">
									<h3>Related</h3>
									<div className="related-card">
										<h3>Opportunities</h3>
										<div className="subtle">No related opportunities.</div>
									</div>
								</section>
							</div>
						</TabsContent>

						{ALL_TABS.slice(1).map((tab) => (
							<TabsContent key={tab.id} value={tab.id} className="p-4 text-muted-foreground mt-0">
								Content for {tab.label} will be displayed here.
							</TabsContent>
						))}
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
