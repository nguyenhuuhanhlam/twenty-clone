import { Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

type TopbarProps = {
  breadcrumb: string;
  title: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
};

export function Topbar({ breadcrumb, title, icon, actions }: TopbarProps) {
  return (
    <header className="topbar">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="flex flex-col justify-center">
          <span className="breadcrumb text-[11px] leading-none mb-0.5 text-neutral-500">{breadcrumb}</span>
          <div className="flex items-center gap-2">
            {icon}
            <h1 className="m-0 text-sm font-semibold leading-none">{title}</h1>
          </div>
        </div>
      </div>
      <div className="topbar-actions">
        {actions}
      </div>
    </header>
  );
}
