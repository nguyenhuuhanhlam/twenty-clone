import { MoreHorizontal, X } from 'lucide-react';
import styled from '@emotion/styled';
import type { UserRecord } from '../types';
import { formatDate, getInitial, getUserColor } from '../utils';
import { useResizeDetector } from 'react-resize-detector';



import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
	const { ref, width } = useResizeDetector();

	return (

		<aside ref={ref} className="detail-panel" aria-hidden={!user} aria-label="Chi tiết bản ghi">
			{user ? (
				<Tabs defaultValue="overview" className="flex h-full flex-col min-w-0">
					<div className="panel-header">
						<button className="tool-button" type="button" aria-label="Đóng panel" onClick={onClose}>
							<X size={16} />
						</button>
						<div className="panel-title">
							<span className="avatar tiny" style={{ background: getUserColor(user) }}>
								{getInitial(user.displayName)}
							</span>
							<strong>{user.displayName}</strong>
							<span>Created {formatDate(user.createdAt)}</span>
						</div>
						<button className="tool-button" type="button" aria-label="More actions">
							<MoreHorizontal size={16} />
						</button>
					</div>

					<TabsList
						variant="line"
						className="w-max inline-flex"
					// className="flex w-full justify-start overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide [&>*]:flex-none gap-6 px-4 border-b border-border-soft"
					>
						{ALL_TABS.map((tab) => (
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
