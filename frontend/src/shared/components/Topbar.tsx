import { Download, Plus } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function Topbar() {
  return (
    <header className="topbar">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="flex flex-col justify-center">
          <span className="breadcrumb text-[11px] leading-none mb-0.5 text-neutral-500">Dữ liệu</span>
          <h1 className="m-0 text-sm font-semibold leading-none">Liên hệ</h1>
        </div>
      </div>
      <div className="topbar-actions">
        <button className="ghost-button" type="button">
          <Download size={16} />
          Xuất
        </button>
        <button className="primary-button" type="button">
          <Plus size={16} />
          Thêm
        </button>
      </div>
    </header>
  );
}
