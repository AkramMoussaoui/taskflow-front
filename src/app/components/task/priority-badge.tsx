import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/app/components/ui/utils';
import { AlertCircle, ArrowUp, ArrowDown, Flame } from 'lucide-react';

const priorityBadgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 transition-colors',
  {
    variants: {
      priority: {
        low: 'bg-[var(--priority-low)]/10 text-[var(--priority-low)]',
        medium: 'bg-[var(--priority-medium)]/10 text-[var(--priority-medium)]',
        high: 'bg-[var(--priority-high)]/10 text-[var(--priority-high)]',
        critical: 'bg-[var(--priority-critical)]/10 text-[var(--priority-critical)]',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      priority: 'medium',
      size: 'sm',
    },
  }
);

const priorityIcons = {
  low: ArrowDown,
  medium: AlertCircle,
  high: ArrowUp,
  critical: Flame,
};

export interface PriorityBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof priorityBadgeVariants> {
  showIcon?: boolean;
}

export function PriorityBadge({
  className,
  priority,
  size,
  showIcon = true,
  children,
  ...props
}: PriorityBadgeProps) {
  const Icon = priority ? priorityIcons[priority] : null;

  return (
    <div
      className={cn(priorityBadgeVariants({ priority, size }), className)}
      {...props}
    >
      {showIcon && Icon && <Icon className="h-3.5 w-3.5" />}
      <span className="capitalize">{children || priority}</span>
    </div>
  );
}
