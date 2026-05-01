import { Download, Plus } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function Topbar() {
  return (
    <header className="topbar">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div>
          <div className="breadcrumb">Dữ liệu</div>
          <h1>Liên hệ</h1>
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
