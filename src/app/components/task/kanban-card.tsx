import React from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardContent, CardHeader } from '../ui/card';
import { PriorityBadge } from './priority-badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Calendar, MessageSquare, Paperclip } from 'lucide-react';
import { cn } from '../ui/utils';

export interface KanbanCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  assignees?: Array<{
    name: string;
    avatar?: string;
    initials?: string;
  }>;
  dueDate?: string;
  tags?: string[];
  comments?: any[];
  attachments?: number;
  onClick?: () => void;
}

export function KanbanCard({
  className,
  id,
  title,
  priority,
  assignees = [],
  dueDate,
  tags = [],
  comments = [],
  attachments,
  onClick,
  ...props
}: KanbanCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Card
      ref={drag as any}
      onClick={onClick}
      className={cn(
        'cursor-pointer cursor-move hover:shadow-lg transition-all hover:scale-[1.02] active:scale-100 active:cursor-grabbing',
        isDragging && 'opacity-50 grayscale scale-95',
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
            {comments && comments.length > 0 && (
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>{comments.length}</span>
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
