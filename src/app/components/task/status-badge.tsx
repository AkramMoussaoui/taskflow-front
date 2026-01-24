import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/app/components/ui/utils';
import { Circle, Clock, Eye, CheckCircle2 } from 'lucide-react';

const statusBadgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 transition-colors',
  {
    variants: {
      status: {
        todo: 'bg-[var(--status-todo)]/10 text-[var(--status-todo)]',
        'in-progress': 'bg-[var(--status-in-progress)]/10 text-[var(--status-in-progress)]',
        review: 'bg-[var(--status-review)]/10 text-[var(--status-review)]',
        done: 'bg-[var(--status-done)]/10 text-[var(--status-done)]',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      status: 'todo',
      size: 'sm',
    },
  }
);

const statusIcons = {
  todo: Circle,
  'in-progress': Clock,
  review: Eye,
  done: CheckCircle2,
};

const statusLabels = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  review: 'Review',
  done: 'Done',
};

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  showIcon?: boolean;
}

export function StatusBadge({
  className,
  status,
  size,
  showIcon = true,
  children,
  ...props
}: StatusBadgeProps) {
  const Icon = status ? statusIcons[status] : null;
  const label = status ? statusLabels[status] : '';

  return (
    <div
      className={cn(statusBadgeVariants({ status, size }), className)}
      {...props}
    >
      {showIcon && Icon && <Icon className="h-3.5 w-3.5" />}
      <span>{children || label}</span>
    </div>
  );
}
