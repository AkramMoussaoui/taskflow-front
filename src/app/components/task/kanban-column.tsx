import React from 'react';
import { useDrop } from 'react-dnd';
import { cn } from '../ui/utils';
import { Badge } from '../ui/badge';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';

export interface KanbanColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  status: string;
  count?: number;
  color?: string;
  onDropTask?: (taskId: string) => void;
}

export function KanbanColumn({
  className,
  title,
  status,
  count,
  color,
  children,
  onDropTask,
  ...props
}: KanbanColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item: { id: string }) => {
      onDropTask?.(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop as any}
      className={cn(
        'flex flex-col gap-3 rounded-lg p-4 min-w-[280px] max-w-[320px] transition-colors duration-200',
        isOver ? 'bg-primary/5 ring-2 ring-primary/20 ring-inset' : 'bg-muted/30',
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
