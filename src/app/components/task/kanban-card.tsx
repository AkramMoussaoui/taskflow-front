import React from 'react';
import { Card, CardContent, CardHeader } from '@/app/components/ui/card';
import { PriorityBadge } from '@/app/components/task/priority-badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { Calendar, MessageSquare, Paperclip } from 'lucide-react';
import { cn } from '@/app/components/ui/utils';

export interface KanbanCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  assignees?: Array<{
    name: string;
    avatar?: string;
    initials?: string;
  }>;
  dueDate?: string;
  tags?: string[];
  comments?: number;
  attachments?: number;
}

export function KanbanCard({
  className,
  title,
  priority,
  assignees = [],
  dueDate,
  tags = [],
  comments,
  attachments,
  ...props
}: KanbanCardProps) {
  return (
    <Card
      className={cn(
        'cursor-move hover:shadow-lg transition-all hover:scale-[1.02] active:scale-100 active:cursor-grabbing',
        className
      )}
      {...props}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="flex-1 line-clamp-2">{title}</h4>
          {priority && <PriorityBadge priority={priority} showIcon={false} />}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between gap-2">
          {/* Meta Info */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{dueDate}</span>
              </div>
            )}
            {comments !== undefined && comments > 0 && (
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>{comments}</span>
              </div>
            )}
            {attachments !== undefined && attachments > 0 && (
              <div className="flex items-center gap-1">
                <Paperclip className="h-3.5 w-3.5" />
                <span>{attachments}</span>
              </div>
            )}
          </div>

          {/* Assignees */}
          {assignees.length > 0 && (
            <div className="flex -space-x-2">
              {assignees.slice(0, 3).map((assignee, index) => (
                <Avatar key={index} className="h-6 w-6 border-2 border-background">
                  {assignee.avatar && <AvatarImage src={assignee.avatar} alt={assignee.name} />}
                  <AvatarFallback className="text-xs">{assignee.initials}</AvatarFallback>
                </Avatar>
              ))}
              {assignees.length > 3 && (
                <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                  +{assignees.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
