import React from 'react';
import { Progress } from '@/app/components/ui/progress';
import { cn } from '@/app/components/ui/utils';

export interface TaskProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  completed: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  variant?: 'default' | 'compact';
}

export function TaskProgress({
  className,
  completed,
  total,
  label,
  showPercentage = true,
  variant = 'default',
  ...props
}: TaskProgressProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isCompact = variant === 'compact';

  return (
    <div className={cn('space-y-2', className)} {...props}>
      {!isCompact && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {label || 'Progress'}
          </span>
          <span className="font-medium">
            {showPercentage ? `${percentage}%` : `${completed}/${total}`}
          </span>
        </div>
      )}
      
      <Progress value={percentage} className="h-2" />
      
      {!isCompact && (
        <p className="text-xs text-muted-foreground">
          {completed} of {total} tasks completed
        </p>
      )}
    </div>
  );
}
