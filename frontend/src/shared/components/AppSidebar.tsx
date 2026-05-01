import type { User } from 'firebase/auth';
import { Home, Settings, Users, LogOut, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { logout } from '../../features/auth/services/authService';
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

type AppSidebarProps = {
  user: User;
};

function getInitial(value?: string | null) {
  return value?.trim().slice(0, 1).toUpperCase() || 'U';
}

export function AppSidebar({ user }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 group-data-[collapsible=icon]:px-2">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-cyan-700 font-bold text-cyan-50">
            A
          </div>
          <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
            <span className="truncate text-sm font-semibold text-foreground">TwentyClone</span>
            <span className="truncate text-xs text-muted-foreground">Không gian</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Tìm kiếm">
                  <Search className="shrink-0" />
                  <span className="group-data-[collapsible=icon]:hidden">Tìm kiếm</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Không gian</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={<a href="#home" />} tooltip="Nhà">
                  <Home className="shrink-0" />
                  <span className="group-data-[collapsible=icon]:hidden">Nhà</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<a href="#people" />} isActive tooltip="Liên hệ">
                  <Users className="shrink-0" />
                  <span className="group-data-[collapsible=icon]:hidden">Liên hệ</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Cài đặt">
              <Settings className="shrink-0" />
              <span className="group-data-[collapsible=icon]:hidden">Cài đặt</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="h-12 w-full justify-start group-data-[collapsible=icon]:justify-center"
              onClick={logout}
              tooltip="Đăng xuất"
            >
              <div className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                {user.photoURL && (
                  <img
                    className="absolute inset-0 h-full w-full rounded-full object-cover group-data-[collapsible=icon]:hidden"
                    src={user.photoURL}
                    alt=""
                  />
                )}
                <div
                  className={cn(
                    'flex h-full w-full items-center justify-center rounded-full bg-cyan-700 text-xs font-bold text-cyan-50',
                    user.photoURL && 'hidden group-data-[collapsible=icon]:flex',
                  )}
                >
                  {getInitial(user.displayName || user.email)}
                </div>
              </div>
              <div className="flex flex-col items-start overflow-hidden group-data-[collapsible=icon]:hidden">
                <span className="w-full truncate text-left text-sm font-medium text-foreground">
                  {user.displayName || 'Người dùng'}
                </span>
                <span className="w-full truncate text-left text-xs text-muted-foreground">{user.email}</span>
              </div>
              <LogOut className="ml-auto shrink-0 group-data-[collapsible=icon]:hidden" size={14} />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
