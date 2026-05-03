import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { useResizeDetector } from 'react-resize-detector';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown_menu';
import { cn } from '@/lib/utils';

type TabItem = { id: string; label: string };

interface SmartTabsListProps {
	tabs: TabItem[];
	activeTab: string;
	onTabChange: (id: string) => void;
	className?: string;
}

const MORE_BTN_WIDTH = 70;
const GAP = 8;

export function SmartTabsList({ tabs, activeTab, onTabChange, className }: SmartTabsListProps) {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const itemsRef = React.useRef<(HTMLButtonElement | null)[]>([]);
	const [visibleCount, setVisibleCount] = React.useState(tabs.length);
	const [initialized, setInitialized] = React.useState(false);

	const { width } = useResizeDetector({ targetRef: containerRef });

	React.useLayoutEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const style = getComputedStyle(container);
		const available = container.offsetWidth - parseFloat(style.paddingLeft) * 2;
		const items = itemsRef.current;

		// Single-pass: accumulate tab widths, break early when overflow detected
		let total = 0;
		let count = items.length;

		for (let i = 0; i < items.length; i++) {
			const w = (items[i]?.offsetWidth ?? 0) + (i < items.length - 1 ? GAP : 0);
			total += w;
			if (total + MORE_BTN_WIDTH > available) {
				count = i; // exclude current item — need room for "More" button
				break;
			}
		}

		setVisibleCount(Math.max(1, count));
		if (!initialized) setInitialized(true);
	}, [width, tabs.length]);

	const hiddenTabs = tabs.slice(visibleCount);

	return (
		<div ref={containerRef} className={cn('relative flex items-center w-full min-w-0', className)}>
			<TabsList
				variant="line"
				className={cn(
					'flex-1 justify-start overflow-hidden border-b border-border-soft px-4 gap-2',
					!initialized && 'opacity-0'
				)}
			>
				{tabs.map((tab, i) => (
					<TabsTrigger
						key={tab.id}
						value={tab.id}
						ref={(el) => { itemsRef.current[i] = el; }}
						className={cn(
							'record-tab min-w-max flex-none',
							i >= visibleCount && 'absolute invisible pointer-events-none -left-[9999px] top-0'
						)}
						onClick={() => onTabChange(tab.id)}
					>
						{tab.label}
					</TabsTrigger>
				))}

				{hiddenTabs.length > 0 && (
					<DropdownMenu>
						<DropdownMenuTrigger
							render={
								<button
									type="button"
									className={cn(
										'record-tab flex items-center shrink-0 gap-1 px-2 text-muted-foreground hover:text-foreground outline-none',
										hiddenTabs.some((t) => t.id === activeTab) && 'active'
									)}
								>
									More <ChevronDown className="h-3.5 w-3.5" />
								</button>
							}
						/>
						<DropdownMenuContent align="end" className="w-40">
							{hiddenTabs.map((tab) => (
								<DropdownMenuItem
									key={tab.id}
									onClick={() => onTabChange(tab.id)}
									className={cn(activeTab === tab.id && 'bg-accent text-accent-foreground')}
								>
									{tab.label}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</TabsList>
		</div>
	);
}
