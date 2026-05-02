import { EmptyState } from '../../../shared/components/empty_state';
import { ErrorState } from '../../../shared/components/error_state';
import { LoadingState } from '../../../shared/components/loading_state';
import type { UserRecord } from '../types';
import { formatDate, getInitial, getUserColor } from '../utils';

type UsersTableProps = {
  users: UserRecord[];
  selectedUserId: string | null;
  loading: boolean;
  error: string | null;
  onSelectUser: (userId: string) => void;
};

export function UsersTable({ users, selectedUserId, loading, error, onSelectUser }: UsersTableProps) {
  if (loading) {
    return <LoadingState label="Loading users..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (users.length === 0) {
    return <EmptyState title="No users found" description="Add documents to the 'users' collection in Firestore." />;
  }

  return (
    <section className="table-frame" aria-label="Bảng liên hệ">
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th className="check-col">
                <input type="checkbox" aria-label="Select all" />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Provider</th>
              <th>Status</th>
              <th>Created at</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                className={selectedUserId === user.id ? 'selected' : ''}
                key={user.id}
                tabIndex={0}
                onClick={(event) => {
                  if (event.target instanceof HTMLInputElement) return;
                  onSelectUser(user.id);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onSelectUser(user.id);
                  }
                }}
              >
                <td className="check-col">
                  <input type="checkbox" aria-label={`Chọn ${user.displayName}`} />
                </td>
                <td>
                  <div className="person-cell">
                    <span className="avatar" style={{ background: getUserColor(user) }}>
                      {getInitial(user.displayName)}
                    </span>
                    <div>
                      <div className="person-name">{user.displayName}</div>
                      <div className="subtle">{user.isActive ? 'Active' : 'Inactive'}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email || 'None'}</td>
                <td>{user.role || 'None'}</td>
                <td>
                  <span className="company-badge">{user.authProvider}</span>
                </td>
                <td>
                  <span className={user.isActive ? 'status-badge active' : 'status-badge inactive'}>
                    {user.isActive ? 'On' : 'Off'}
                  </span>
                </td>
                <td>{formatDate(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
