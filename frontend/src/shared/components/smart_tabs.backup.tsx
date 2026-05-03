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

type TabItem = {
	id: string;
	label: string;
};

interface SmartTabsListProps {
	tabs: TabItem[];
	activeTab: string;
	onTabChange: (id: string) => void;
	className?: string;
}

export function SmartTabsList({ tabs, activeTab, onTabChange, className }: SmartTabsListProps) {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const itemsRef = React.useRef<(HTMLButtonElement | null)[]>([]);
	const [isInitialized, setIsInitialized] = React.useState(false);
	const [visibleCount, setVisibleCount] = React.useState(tabs.length);
	const { width } = useResizeDetector({ targetRef: containerRef });

	const updateVisibleTabs = React.useCallback(() => {
		if (!containerRef.current || itemsRef.current.length === 0) return;

		const containerWidth = containerRef.current.offsetWidth;
		const padding = 32; // px-4 on each side = 32px total
		const availableWidth = containerWidth - padding;
		const moreButtonWidth = 70; // Width of "More" button + gap
		const gap = 8; // gap-2

		let currentWidth = 0;
		let count = 0;

		// 1. Check if all tabs fit without "More" button
		let allFit = true;
		let totalWidth = 0;
		for (let i = 0; i < itemsRef.current.length; i++) {
			const item = itemsRef.current[i];
			if (item) {
				const itemWidth = item.offsetWidth + (i < tabs.length - 1 ? gap : 0);
				if (totalWidth + itemWidth > availableWidth) {
					allFit = false;
					break;
				}
				totalWidth += itemWidth;
			}
		}

		if (allFit) {
			setVisibleCount(tabs.length);
			return;
		}

		// 2. Not all fit, calculate how many fit alongside the "More" button
		for (let i = 0; i < itemsRef.current.length; i++) {
			const item = itemsRef.current[i];
			if (item) {
				const itemWidth = item.offsetWidth + gap;
				if (currentWidth + itemWidth + moreButtonWidth > availableWidth) {
					break;
				}
				currentWidth += itemWidth;
				count++;
			}
		}

		// Ensure at least one tab is visible
		setVisibleCount(Math.max(1, count));
	}, [tabs.length]);

	React.useLayoutEffect(() => {
		updateVisibleTabs();
		setIsInitialized(true);
	}, [width, updateVisibleTabs]);

	const hiddenTabs = tabs.slice(visibleCount);

	// If active tab is in hidden tabs, we might want to prioritize it, 
	// but for now let's keep it simple and just show it in the menu.

	return (
		<div ref={containerRef} className={cn("relative flex items-center w-full min-w-0", className)}>
			<TabsList
				variant="line"
				className={cn(
					"flex-1 justify-start overflow-hidden border-b border-border-soft px-4 gap-2 transition-opacity duration-150",
					!isInitialized && "opacity-0"
				)}
			>
				{tabs.map((tab, index) => (
					<TabsTrigger
						key={tab.id}
						value={tab.id}
						ref={(el) => { itemsRef.current[index] = el; }}
						className={cn(
							"record-tab min-w-max flex-none",
							index >= visibleCount && "absolute invisible pointer-events-none -left-[9999px] top-0"
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
										"record-tab flex items-center shrink-0 gap-1 px-2 text-muted-foreground hover:text-foreground outline-none",
										hiddenTabs.some((tab) => tab.id === activeTab) && "active"
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
									className={cn(activeTab === tab.id && "bg-accent text-accent-foreground")}
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
