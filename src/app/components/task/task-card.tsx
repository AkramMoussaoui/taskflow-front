import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { PriorityBadge } from '@/app/components/task/priority-badge';
import { StatusBadge } from '@/app/components/task/status-badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { Calendar, MessageSquare, Paperclip } from 'lucide-react';
import { cn } from '@/app/components/ui/utils';

export interface TaskCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  status?: 'todo' | 'in-progress' | 'review' | 'done';
  assignee?: {
    name: string;
    avatar?: string;
    initials?: string;
  };
  dueDate?: string;
  tags?: string[];
  comments?: number;
  attachments?: number;
  variant?: 'default' | 'compact' | 'detailed';
}

export function TaskCard({
  className,
  title,
  description,
  priority = 'medium',
  status = 'todo',
  assignee,
  dueDate,
  tags = [],
  comments,
  attachments,
  variant = 'default',
  ...props
}: TaskCardProps) {
  const isCompact = variant === 'compact';
  const isDetailed = variant === 'detailed';

  return (
    <Card className={cn('hover:shadow-md transition-shadow cursor-pointer', className)} {...props}>
      <CardHeader className={cn(isCompact && 'pb-3')}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className={cn(isCompact && 'text-base')}>{title}</CardTitle>
            {description && !isCompact && (
              <CardDescription className="mt-1.5">{description}</CardDescription>
            )}
          </div>
          <PriorityBadge priority={priority} />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Status and Assignee */}
        <div className="flex items-center justify-between gap-3">
          <StatusBadge status={status} />
          {assignee && (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                {assignee.avatar && <AvatarImage src={assignee.avatar} alt={assignee.name} />}
                <AvatarFallback className="text-xs">{assignee.initials}</AvatarFallback>
              </Avatar>
              {isDetailed && (
                <span className="text-sm text-muted-foreground">{assignee.name}</span>
              )}
            </div>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Meta Info */}
        {(dueDate || comments !== undefined || attachments !== undefined) && (
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
            {dueDate && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{dueDate}</span>
              </div>
            )}
            {comments !== undefined && comments > 0 && (
              <div className="flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>{comments}</span>
              </div>
            )}
            {attachments !== undefined && attachments > 0 && (
              <div className="flex items-center gap-1.5">
                <Paperclip className="h-3.5 w-3.5" />
                <span>{attachments}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
