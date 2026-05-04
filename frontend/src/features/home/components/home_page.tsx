import * as React from 'react';
import { Smile } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Topbar } from '../../../shared/components/topbar';

export function HomePage({ group, title }: { group: string; title: string }) {
  return (
    <div className="content bg-background">
      <Topbar
        breadcrumb={group}
        title={title}
      />

      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="max-w-md space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary mb-2">
            <Smile size={32} />
          </div>
          <h4 className="text-xl font-bold tracking-tight">Welcome to TwentyClone</h4>
          <p className="text-neutral-500 text-lg">
            Your standardized workspace for content management and user operations.
            Start by exploring the modules in the sidebar.
          </p>
          <div className="pt-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-neutral-800 text-neutral-400 text-xs font-medium border border-neutral-700">
              v1.0.0 Stable
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
