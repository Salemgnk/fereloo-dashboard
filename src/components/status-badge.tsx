import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { TenantStatus } from '@/lib/types';

const STATUS_STYLE: Record<
  TenantStatus,
  { className: string; dotClassName: string; pulse?: boolean }
> = {
  active: {
    className: 'border-success/30 bg-success/10 text-success',
    dotClassName: 'bg-success',
  },
  provisioning: {
    className: 'border-primary/30 bg-primary/10 text-primary',
    dotClassName: 'bg-primary',
    pulse: true,
  },
  failed: {
    className: 'border-destructive/30 bg-destructive/10 text-destructive',
    dotClassName: 'bg-destructive',
  },
  suspended: {
    className: 'border-warning/30 bg-warning/10 text-warning',
    dotClassName: 'bg-warning',
  },
};

export function StatusBadge({ status, className }: { status: TenantStatus; className?: string }) {
  const { t } = useTranslation();
  const cfg = STATUS_STYLE[status];
  return (
    <Badge
      variant="outline"
      className={cn('gap-1.5 font-mono text-[10px] uppercase tracking-wider', cfg.className, className)}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          cfg.dotClassName,
          cfg.pulse && 'animate-pulse-glow',
        )}
      />
      {t(`status.${status}`)}
    </Badge>
  );
}
