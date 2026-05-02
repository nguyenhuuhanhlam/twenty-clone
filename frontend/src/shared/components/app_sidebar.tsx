import type { User } from 'firebase/auth';
import { Home, Settings, Users, LogOut, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { logout } from '../../features/auth/services/auth_service';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';

import {
  WorkspaceLogo,
  WorkspaceMeta,
  AppTitle,
  AppSubTitle,
  UserAvatar,
  UserInfo,
  UserName,
  UserEmail,
} from './styles/app_sidebar_styles';

type AppSidebarProps = {
  user: User;
};

function getInitial(value?: string | null) {
  return value?.trim().slice(0, 1).toUpperCase() || 'U';
}

export function AppSidebar({ user }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 group-data-[collapsible=icon]:px-0">
        <div className="flex w-full items-center gap-3 group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:justify-center">
          <WorkspaceLogo>A</WorkspaceLogo>
          <WorkspaceMeta>
            <AppTitle>TwentyClone</AppTitle>
            <AppSubTitle>Workspace</AppSubTitle>
          </WorkspaceMeta>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Search">
                  <Search className="shrink-0" />
                  <span className="group-data-[collapsible=icon]:hidden">Search</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={<a href="#home" />} tooltip="Home">
                  <Home className="shrink-0" />
                  <span className="group-data-[collapsible=icon]:hidden">Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={<a href="#users" />} isActive tooltip="Users">
                  <Users className="shrink-0" />
                  <span className="group-data-[collapsible=icon]:hidden">Users</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings className="shrink-0" />
              <span className="group-data-[collapsible=icon]:hidden">Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="h-12 w-full justify-start group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:justify-center"
              onClick={logout}
              tooltip="Logout"
            >
              <UserAvatar>
                {user.photoURL && (
                  <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={user.photoURL}
                    alt=""
                  />
                )}
                <div
                  className={cn(
                    'flex h-full w-full items-center justify-center',
                    user.photoURL && 'hidden group-data-[collapsible=icon]:flex',
                  )}
                >
                  {getInitial(user.displayName || user.email)}
                </div>
              </UserAvatar>
              <UserInfo>
                <UserName>{user.displayName || 'User'}</UserName>
                <UserEmail>{user.email}</UserEmail>
              </UserInfo>
              <LogOut className="ml-auto shrink-0 group-data-[collapsible=icon]:hidden" size={14} />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
