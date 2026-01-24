import React from 'react';
import { Checkbox } from '@/app/components/ui/checkbox';
import { PriorityBadge } from '@/app/components/task/priority-badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Calendar } from 'lucide-react';
import { cn } from '@/app/components/ui/utils';

export interface TaskListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  assignee?: {
    name: string;
    avatar?: string;
    initials?: string;
  };
  dueDate?: string;
  onToggleComplete?: (completed: boolean) => void;
}

export function TaskListItem({
  className,
  title,
  completed = false,
  priority,
  assignee,
  dueDate,
  onToggleComplete,
  ...props
}: TaskListItemProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-accent/50 transition-colors group',
        completed && 'opacity-60',
        className
      )}
      {...props}
    >
      <Checkbox
        checked={completed}
        onCheckedChange={onToggleComplete}
        className="shrink-0"
      />
      
      <div className="flex-1 min-w-0">
        <p className={cn('truncate', completed && 'line-through text-muted-foreground')}>
          {title}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {priority && <PriorityBadge priority={priority} showIcon={false} />}
        
        {dueDate && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{dueDate}</span>
          </div>
        )}
        
        {assignee && (
          <Avatar className="h-6 w-6">
            {assignee.avatar && <AvatarImage src={assignee.avatar} alt={assignee.name} />}
            <AvatarFallback className="text-xs">{assignee.initials}</AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
}

export interface TaskListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Array<Omit<TaskListItemProps, 'onToggleComplete'>>;
  onToggleComplete?: (index: number, completed: boolean) => void;
}

export function TaskList({
  className,
  items,
  onToggleComplete,
  ...props
}: TaskListProps) {
  return (
    <div className={cn('space-y-1', className)} {...props}>
      {items.map((item, index) => (
        <TaskListItem
          key={index}
          {...item}
          onToggleComplete={(completed) => onToggleComplete?.(index, completed)}
        />
      ))}
    </div>
  );
}
