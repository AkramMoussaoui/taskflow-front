import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { cn } from '@/app/components/ui/utils';
import { LucideIcon } from 'lucide-react';

export interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'destructive';
}

export function StatsCard({
  className,
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = 'default',
  ...props
}: StatsCardProps) {
  const variantStyles = {
    default: 'bg-card text-card-foreground',
    primary: 'bg-primary text-primary-foreground',
    success: 'bg-[var(--success)] text-[var(--success-foreground)]',
    warning: 'bg-[var(--warning)] text-[var(--warning-foreground)]',
    destructive: 'bg-destructive text-destructive-foreground',
  };

  return (
    <Card className={cn(variantStyles[variant], className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium opacity-90">
          {title}
        </CardTitle>
        {Icon && (
          <Icon className="h-4 w-4 opacity-70" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend) && (
          <div className="flex items-center gap-2 mt-1 text-xs opacity-80">
            {trend && (
              <span className={cn(
                'font-medium',
                trend.isPositive ? 'text-[var(--success)]' : 'text-[var(--destructive)]'
              )}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
            )}
            {description && <span>{description}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
