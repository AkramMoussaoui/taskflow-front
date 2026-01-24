import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { cn } from '@/app/components/ui/utils';

export interface TeamMemberProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  role?: string;
  avatar?: string;
  initials?: string;
  activeTasks?: number;
  completedTasks?: number;
  variant?: 'default' | 'compact' | 'detailed';
}

export function TeamMember({
  className,
  name,
  role,
  avatar,
  initials,
  activeTasks,
  completedTasks,
  variant = 'default',
  ...props
}: TeamMemberProps) {
  const isCompact = variant === 'compact';
  const isDetailed = variant === 'detailed';

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors',
        className
      )}
      {...props}
    >
      <Avatar className={cn(isCompact ? 'h-8 w-8' : 'h-10 w-10')}>
        {avatar && <AvatarImage src={avatar} alt={name} />}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{name}</p>
        {role && <p className="text-sm text-muted-foreground truncate">{role}</p>}
      </div>

      {!isCompact && (activeTasks !== undefined || completedTasks !== undefined) && (
        <div className="flex items-center gap-2">
          {activeTasks !== undefined && (
            <Badge variant="secondary" className="text-xs">
              {activeTasks} active
            </Badge>
          )}
          {isDetailed && completedTasks !== undefined && (
            <Badge variant="outline" className="text-xs">
              {completedTasks} done
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
