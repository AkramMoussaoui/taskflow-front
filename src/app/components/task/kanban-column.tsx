import React from 'react';
import { cn } from '@/app/components/ui/utils';
import { Badge } from '@/app/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

export interface KanbanColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  count?: number;
  color?: string;
}

export function KanbanColumn({
  className,
  title,
  count,
  color,
  children,
  ...props
}: KanbanColumnProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 bg-muted/30 rounded-lg p-4 min-w-[280px] max-w-[320px]',
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {color && (
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: color }}
            />
          )}
          <h3 className="font-medium">{title}</h3>
          {count !== undefined && (
            <Badge variant="secondary" className="h-5 px-1.5 text-xs">
              {count}
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3 min-h-[200px]">
        {children}
      </div>
    </div>
  );
}
