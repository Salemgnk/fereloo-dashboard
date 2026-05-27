import { createFileRoute, useRouter, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, ExternalLink, XCircle, RefreshCw } from 'lucide-react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { ProvisioningSpinner } from '@/components/provisioning-spinner';
import { useAuth } from '@/lib/use-auth';
import { streamTenantStatus } from '@/lib/api';
import type { TenantStatusResponse } from '@/lib/types';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/status/$tenantId')({
  head: () => ({
    meta: [
      { title: 'Création en cours — Fereloo' },
      { name: 'description', content: 'Votre CRM Fereloo est en cours de création.' },
    ],
  }),
  component: StatusPage,
});

function useTips() {
  const { t } = useTranslation();
  const tips = t('statusPage.tips', { returnObjects: true }) as string[];
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % tips.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, [tips.length]);

  return { tip: tips[index], visible };
}

function useTenantStatusStream(tenantId: string) {
  const [data, setData] = useState<TenantStatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const cleanup = streamTenantStatus(
      tenantId,
      (d) => { setData(d); setIsLoading(false); setIsError(false); },
      () => { setIsError(true); setIsLoading(false); },
    );
    return cleanup;
  }, [tenantId]);

  return { data, isLoading, isError };
}

function StatusPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.navigate({ to: '/' });
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <ProvisioningSpinner size="lg" />
      </div>
    );
  }

  return (
    <AppShell>
      <StatusView />
    </AppShell>
  );
}

function StatusView() {
  const { t } = useTranslation();
  const { tenantId } = Route.useParams();
  const { data, isLoading, isError } = useTenantStatusStream(tenantId);
  const { tip, visible } = useTips();

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8 text-center">
        <ProvisioningSpinner size="lg" />
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/40 animate-pulse">
          {t('statusPage.loading')}
        </p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
        <XCircle className="h-12 w-12 text-destructive/60" />
        <div className="space-y-2">
          <p className="font-display text-lg font-bold">{t('statusPage.notFound.title')}</p>
          <p className="text-sm text-muted-foreground">{t('statusPage.notFound.desc')}</p>
        </div>
        <Button asChild variant="outline">
          <Link to="/">{t('statusPage.notFound.back')}</Link>
        </Button>
      </div>
    );
  }

  const { tenant, progress, errorMessage } = data;
  const isReady = tenant.status === 'active';
  const isFailed = tenant.status === 'failed';

  if (isReady) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8 text-center animate-fade-in">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-success/30 bg-success/10">
          <CheckCircle2 className="h-9 w-9 text-success" />
        </div>
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-success/70">
            {t('statusPage.ready.badge')}
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight">{t('statusPage.ready.title')}</h1>
          <p className="text-sm text-muted-foreground">
            {t('statusPage.ready.subtitle', { subdomain: tenant.subdomain })}
          </p>
        </div>
        <Button asChild size="lg" className="glow-primary h-12 px-8 font-bold text-xs uppercase tracking-widest">
          <a href={tenant.wizardUrl ?? tenant.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
            {t('statusPage.ready.openCrm')}
          </a>
        </Button>
        <Link to="/" className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">
          {t('statusPage.ready.back')}
        </Link>
      </div>
    );
  }

  if (isFailed) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8 text-center animate-fade-in">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-destructive/30 bg-destructive/10">
          <XCircle className="h-9 w-9 text-destructive" />
        </div>
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-destructive/70">
            {t('statusPage.failed.badge')}
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight">{t('statusPage.failed.title')}</h1>
          {errorMessage && (
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">{errorMessage}</p>
          )}
        </div>
        <Button asChild variant="outline" className="h-11 px-6 font-bold text-xs uppercase tracking-widest">
          <Link to="/provision">
            <RefreshCw className="h-4 w-4" />
            {t('statusPage.failed.retry')}
          </Link>
        </Button>
        <Link to="/" className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">
          {t('statusPage.failed.back')}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-10 text-center">

      <ProvisioningSpinner size="lg" />

      <div className="space-y-2">
        <p className="font-mono text-[10px] uppercase tracking-widest text-primary/60">
          {t('statusPage.provisioning.badge')}
        </p>
        <h1 className="font-display text-2xl font-bold tracking-tight">
          {tenant.subdomain}<span className="text-muted-foreground/30">.fereloo.com</span>
        </h1>
      </div>

      <div className="w-full max-w-xs space-y-2">
        <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full progress-gradient transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="font-mono text-[11px] text-muted-foreground/40 tabular-nums">
          {progress} %
        </p>
      </div>

      <div className="max-w-sm px-4">
        <p
          className={cn(
            'text-sm text-muted-foreground/60 leading-relaxed transition-opacity duration-400',
            visible ? 'opacity-100' : 'opacity-0',
          )}
        >
          {tip}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40">
          {t('statusPage.provisioning.live')}
        </span>
      </div>

    </div>
  );
}
