import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ExternalLink,
  Activity,
  Rocket,
  Sparkles,
  Trash2,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { getCurrentTenant, listTenants, watchTenants, deleteTenant } from '@/lib/api';
import { useAuth } from '@/lib/use-auth';
import { useOnboarding } from '@/lib/use-onboarding';
import { AppShell } from '@/components/app-shell';
import { StatusBadge } from '@/components/status-badge';
import { OnboardingModal } from '@/components/onboarding-modal';
import { OnboardingChecklist } from '@/components/onboarding-checklist';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PLANS, type Tenant } from '@/lib/types';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/dashboard')({
  head: () => ({
    meta: [
      { title: 'Tableau de bord — Fereloo' },
      { name: 'description', content: 'Vos CRM Fereloo : statut, plan et accès direct.' },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { t, i18n } = useTranslation();
  const { user, loading, signIn } = useAuth();
  const { companyInfo, checklistDismissed, saveCompanyInfo, dismissChecklist } = useOnboarding(user?.id);

  useEffect(() => {
    if (!loading && !user) signIn();
  }, [user, loading, signIn]);

  const queryClient = useQueryClient();

  const { data: currentTenant, isLoading: loadingCurrent } = useQuery({
    queryKey: ['current-tenant'],
    queryFn: getCurrentTenant,
    enabled: !!user,
  });

  const { data: tenants, isLoading: loadingList } = useQuery({
    queryKey: ['tenants'],
    queryFn: listTenants,
    enabled: !!user,
  });

  useEffect(() => {
    if (!user) return;
    return watchTenants(
      (updated) => {
        queryClient.setQueryData<typeof tenants>(['tenants'], updated);
        queryClient.setQueryData<typeof currentTenant>(['current-tenant'], updated[0] ?? null);
      },
      () => {
        queryClient.invalidateQueries({ queryKey: ['tenants'] });
        queryClient.invalidateQueries({ queryKey: ['current-tenant'] });
      },
    );
  }, [user, queryClient]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const isLoading = loadingCurrent || loadingList;

  const dateStr = new Date().toLocaleDateString(
    i18n.language === 'fr' ? 'fr-FR' : i18n.language === 'de' ? 'de-DE' : 'en-US',
    { weekday: 'long', day: 'numeric', month: 'long' },
  );

  return (
    <AppShell>
      <OnboardingModal open={!companyInfo} userName={user.name} onComplete={saveCompanyInfo} />

      <div className="mx-auto max-w-2xl">

        {/* ── Greeting ── */}
        <div className="mb-10 animate-fade-up">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/40">
            {dateStr}
          </p>
          <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            {t('dashboard.greeting', { name: '' }).trim()}{' '}
            <span className="text-primary">{user.name.split(' ')[0]}</span>
          </h1>
        </div>

        {!checklistDismissed && !isLoading && (
          <div className="mb-6 animate-fade-up animation-delay-100">
            <OnboardingChecklist
              companyDone={!!companyInfo}
              tenants={tenants ?? []}
              onDismiss={dismissChecklist}
            />
          </div>
        )}

        {isLoading ? (
          <DashboardSkeleton />
        ) : !currentTenant ? (
          <NoTenantState />
        ) : (
          <TenantOverview current={currentTenant} all={tenants ?? []} />
        )}
      </div>
    </AppShell>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-44 w-full rounded-2xl" />
      <Skeleton className="h-14 w-full rounded-2xl" />
    </div>
  );
}

function NoTenantState() {
  const { t } = useTranslation();

  const perks = [
    { icon: Zap,          label: 'Prêt en 90 secondes',        desc: 'Installation automatique, zéro configuration.' },
    { icon: ShieldCheck,  label: 'SSL & sécurité inclus',       desc: 'Certificat HTTPS généré automatiquement.' },
    { icon: CheckCircle2, label: 'Support inclus dans le plan', desc: 'Email ou prioritaire selon votre formule.' },
  ];

  return (
    <div className="animate-fade-up space-y-6">

      {/* Hero CTA */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background p-8 text-center">
        {/* decorative glow */}
        <div className="pointer-events-none absolute -top-10 left-1/2 h-32 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
            <Rocket className="h-6 w-6" />
          </div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            {t('dashboard.noTenant.badge')}
          </div>
          <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight">
            {t('dashboard.noTenant.title')}
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {t('dashboard.noTenant.description')}
          </p>
          <Button asChild className="mt-6 glow-primary h-11 px-8 text-sm font-bold">
            <Link to="/provision">
              <Rocket className="h-4 w-4" />
              {t('dashboard.noTenant.startButton')}
            </Link>
          </Button>
        </div>
      </div>

      {/* Perks */}
      <div className="grid gap-2 sm:grid-cols-3">
        {perks.map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/8 text-primary">
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">{label}</p>
              <p className="mt-0.5 font-mono text-[10px] leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TenantOverview({ current, all }: { current: Tenant; all: Tenant[] }) {
  const { t } = useTranslation();
  const others = all.filter((o) => o.id !== current.id);

  return (
    <div className="space-y-3 animate-fade-up animation-delay-100">
      <CurrentTenantCard tenant={current} />

      {others.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {t('dashboard.overview.otherInstances')}
            </p>
            <span className="font-mono text-[10px] text-muted-foreground/50">
              {others.length > 1
                ? t('dashboard.overview.instanceCounts', { count: others.length })
                : t('dashboard.overview.instanceCount', { count: others.length })}
            </span>
          </div>
          <div className="divide-y divide-border">
            {others.map((tenant) => (
              <TenantRow key={tenant.id} tenant={tenant} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CurrentTenantCard({ tenant }: { tenant: Tenant }) {
  const { t } = useTranslation();
  const planObj = PLANS.find((p) => p.id === tenant.plan) ?? PLANS[0];
  const isActive   = tenant.status === 'active';
  const isProv     = tenant.status === 'provisioning';
  const isFailed   = tenant.status === 'failed';
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTenant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
      queryClient.invalidateQueries({ queryKey: ['current-tenant'] });
    },
    onSettled: () => setIsDeleting(false),
  });

  const handleDelete = () => {
    if (window.confirm(t('dashboard.actions.deleteConfirm'))) {
      setIsDeleting(true);
      deleteMutation.mutate(tenant.id);
    }
  };

  const topGradient: Record<string, string> = {
    active:       'from-success/40 via-success/10 to-transparent',
    provisioning: 'from-primary/40 via-primary/10 to-transparent',
    failed:       'from-destructive/40 via-destructive/10 to-transparent',
    suspended:    'from-warning/40 via-warning/10 to-transparent',
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">

      {/* thin gradient top line */}
      <div className={cn('h-0.5 bg-gradient-to-r', topGradient[tenant.status])} />

      {/* ── Hero zone ── */}
      <div className="relative px-6 pb-5 pt-6">

        {/* Status — top right */}
        <div className="absolute right-5 top-5">
          <StatusBadge status={tenant.status} />
        </div>

        {/* Avatar + identity */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 font-display text-base font-extrabold uppercase text-primary select-none">
            {tenant.subdomain.slice(0, 2)}
          </div>
          <div className="min-w-0 pt-0.5">
            <h2 className="font-display text-2xl font-extrabold tracking-tight leading-none">
              {tenant.subdomain}
            </h2>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">
              {tenant.subdomain}.fereloo.com
            </p>
            <span className="mt-2.5 inline-flex items-center rounded-md border border-border bg-secondary px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {planObj.name}
            </span>
          </div>
        </div>

        {/* Status alerts */}
        {isProv && (
          <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-primary/20 bg-primary/6 px-4 py-3 text-sm text-primary">
            <Sparkles className="h-4 w-4 shrink-0 animate-pulse" />
            {t('dashboard.status.provisioningMsg')}
          </div>
        )}
        {isFailed && (
          <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-destructive/20 bg-destructive/6 px-4 py-3 text-sm text-destructive">
            <Activity className="h-4 w-4 shrink-0" />
            {t('dashboard.status.failedMsg')}
          </div>
        )}
      </div>

      {/* ── Actions footer ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-secondary/20 px-5 py-3.5">

        {/* Primary actions */}
        <div className="flex flex-wrap items-center gap-2">
          {isActive && (
            <Button asChild size="sm" className="glow-primary h-8 gap-1.5 px-4 text-xs font-bold">
              <a href={tenant.wizardUrl ?? tenant.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" />
                {t('dashboard.actions.open')}
              </a>
            </Button>
          )}
          {isProv && (
            <Button asChild variant="outline" size="sm" className="h-8 gap-1.5 px-4 text-xs">
              <Link to="/status/$tenantId" params={{ tenantId: tenant.id }}>
                <Activity className="h-3.5 w-3.5" />
                {t('dashboard.actions.trackDeploy')}
              </Link>
            </Button>
          )}
          {isFailed && (
            <Button asChild variant="outline" size="sm" className="h-8 gap-1.5 px-4 text-xs">
              <Link to="/status/$tenantId" params={{ tenantId: tenant.id }}>
                <Activity className="h-3.5 w-3.5" />
                {t('dashboard.actions.viewError')}
              </Link>
            </Button>
          )}
          <Button asChild variant="outline" size="sm" className="h-8 gap-1.5 px-4 text-xs text-muted-foreground">
            <Link to="/provision">
              <ArrowUpRight className="h-3.5 w-3.5" />
              Changer de formule
            </Link>
          </Button>
        </div>

        {/* Delete */}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          title={t('dashboard.actions.deleteTooltip')}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground/50 transition-colors hover:bg-destructive/8 hover:text-destructive disabled:opacity-40"
        >
          {isDeleting
            ? <Activity className="h-3.5 w-3.5 animate-spin" />
            : <Trash2 className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}

function TenantRow({ tenant }: { tenant: Tenant }) {
  const { t } = useTranslation();
  const planObj = PLANS.find((p) => p.id === tenant.plan) ?? PLANS[0];

  return (
    <div className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-accent/30">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary font-mono text-[10px] font-bold uppercase text-muted-foreground select-none">
        {tenant.subdomain.slice(0, 2)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{tenant.subdomain}</span>
          <StatusBadge status={tenant.status} />
        </div>
        <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
          {tenant.subdomain}.fereloo.com · {planObj.name}
        </p>
      </div>
      <div className="shrink-0">
        {tenant.status === 'provisioning' && (
          <Button asChild size="sm" variant="outline" className="h-7 px-3 text-[10px]">
            <Link to="/status/$tenantId" params={{ tenantId: tenant.id }}>
              <Activity className="h-3 w-3" />
              {t('dashboard.actions.track')}
            </Link>
          </Button>
        )}
        {tenant.status === 'active' && (
          <Button asChild size="sm" variant="outline" className="h-7 px-3 text-[10px]">
            <a href={tenant.wizardUrl ?? tenant.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3" />
              {t('dashboard.actions.open')}
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
