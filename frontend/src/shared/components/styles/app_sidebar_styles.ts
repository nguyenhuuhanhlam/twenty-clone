import styled from '@emotion/styled';

// Styled components for the workspace header
export const WorkspaceLogo = styled.div`
  display: flex;
  height: 1.5rem;
  width: 1.5rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: #0e7490;
  font-weight: 700;
  color: #e8fbff;
  font-size: 0.75rem;
`;

export const WorkspaceMeta = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: opacity 0.2s ease;
  
  /* Hide when sidebar is collapsed */
  [data-state='collapsed'] & {
    display: none;
    width: 0;
    opacity: 0;
  }
`;

export const AppTitle = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text);
`;

export const AppSubTitle = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.75rem;
  color: var(--muted-strong);
`;

// Styled components for the user profile footer
export const UserAvatar = styled.div`
  position: relative;
  display: flex;
  height: 1.5rem;
  width: 1.5rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: #0e7490;
  font-size: 0.75rem;
  font-weight: 700;
  color: #e8fbff;
  overflow: hidden;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  margin-left: 0.5rem;

  /* Hide when sidebar is collapsed */
  [data-state='collapsed'] & {
    display: none;
    width: 0;
    opacity: 0;
    margin-left: 0;
  }
`;

export const UserName = styled.span`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text);
`;

export const UserEmail = styled.span`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  font-size: 0.75rem;
  color: var(--muted);
`;
