import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Check,
  CreditCard,
  Sparkles,
  Globe,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProvisioningSpinner } from '@/components/provisioning-spinner';
import { checkSubdomainAvailable, createCheckoutSession } from '@/lib/api';
import { PLANS, type PlanId, type BillingPeriod } from '@/lib/types';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/provision/')({
  component: ProvisionForm,
});

const SUBDOMAIN_REGEX = /^[a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])$/;
type SubdomainCheck = 'idle' | 'checking' | 'available' | 'taken' | 'invalid';

function ProvisionForm() {
  const { t } = useTranslation();
  const [subdomain, setSubdomain] = useState('');
  const [plan, setPlan] = useState<PlanId>('pro');
  const [billing, setBilling] = useState<BillingPeriod>('monthly');
  const [check, setCheck] = useState<SubdomainCheck>('idle');

  useEffect(() => {
    if (!subdomain) { setCheck('idle'); return; }
    if (!SUBDOMAIN_REGEX.test(subdomain)) { setCheck('invalid'); return; }
    setCheck('checking');
    const timer = setTimeout(async () => {
      const ok = await checkSubdomainAvailable(subdomain);
      setCheck(ok ? 'available' : 'taken');
    }, 400);
    return () => clearTimeout(timer);
  }, [subdomain]);

  const checkout = useMutation({
    mutationFn: () => createCheckoutSession({ subdomain, plan, billing }),
    onSuccess: (data) => {
      window.location.href = data.checkout_url;
    },
  });

  const selectedPlan = PLANS.find((p) => p.id === plan)!;
  const canSubmit = check === 'available' && !checkout.isPending && !selectedPlan.contactSales;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="-ml-2 mb-4">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            {t('provision.backToDashboard')}
          </Link>
        </Button>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          {t('provision.title')}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t('provision.subtitle')}
        </p>
      </div>

      <div className="space-y-6">

        {/* ── Subdomain ── */}
        <div className="rounded-xl border border-border bg-card/60 p-6 space-y-4">
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Globe className="h-3.5 w-3.5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold">{t('provision.subdomain.sectionTitle')}</h2>
              <p className="font-mono text-[10px] text-muted-foreground">{t('provision.subdomain.sectionDesc')}</p>
            </div>
          </div>

          <Label htmlFor="subdomain" className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {t('provision.subdomain.label')}
          </Label>
          <div className="flex items-stretch overflow-hidden rounded-lg border border-input bg-background shadow-sm focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
            <Input
              id="subdomain"
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
              placeholder={t('provision.subdomain.placeholder')}
              maxLength={30}
              className="h-11 border-0 bg-transparent font-mono shadow-none focus-visible:ring-0"
              autoFocus
              disabled={checkout.isPending}
            />
            <div className="flex items-center border-l border-border bg-secondary/60 px-3 font-mono text-sm text-muted-foreground shrink-0">
              {t('provision.subdomain.suffix')}
            </div>
          </div>

          <SubdomainStatus state={check} />

          {subdomain && check !== 'invalid' && (
            <div className="flex items-center gap-2 rounded-md bg-secondary/40 px-3 py-2 font-mono text-xs text-muted-foreground">
              <Globe className="h-3 w-3 shrink-0" />
              <span>
                https://
                <span className={cn(
                  check === 'available' ? 'text-success' : check === 'taken' ? 'text-destructive' : 'text-foreground'
                )}>
                  {subdomain}
                </span>
                {t('provision.subdomain.suffix')}
              </span>
            </div>
          )}

          <p className="font-mono text-[11px] text-muted-foreground/70">
            {t('provision.subdomain.hint')}
          </p>
        </div>

        {/* ── Plan selection ── */}
        <div className="rounded-xl border border-border bg-card/60 p-6 space-y-4">
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold">{t('provision.plan.sectionTitle')}</h2>
              <p className="font-mono text-[10px] text-muted-foreground">{t('provision.plan.sectionDesc')}</p>
            </div>
          </div>

          {/* Billing toggle */}
          <div className="flex items-center gap-1 self-start rounded-lg border border-border bg-secondary/40 p-1">
            <button
              type="button"
              onClick={() => setBilling('monthly')}
              className={cn(
                'rounded-md px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-all',
                billing === 'monthly'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              Mensuel
            </button>
            <button
              type="button"
              onClick={() => setBilling('annual')}
              className={cn(
                'flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-all',
                billing === 'annual'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              Annuel
              <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[9px] font-bold text-primary">-20%</span>
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {PLANS.map((p) => {
              const selected = plan === p.id;
              const displayPrice = billing === 'annual' && p.priceEurAnnual ? p.priceEurAnnual : p.priceEur;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlan(p.id)}
                  disabled={checkout.isPending}
                  className={cn(
                    'group relative flex flex-col rounded-xl border p-5 text-left transition-all',
                    selected
                      ? 'border-primary bg-primary/5 glow-primary'
                      : 'border-border bg-card hover:border-primary/30 hover:bg-card/80',
                  )}
                >
                  {p.highlighted && (
                    <span className="absolute -top-2.5 right-3 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary-foreground shadow-sm shadow-primary/20">
                      <Sparkles className="h-2.5 w-2.5" />
                      {t('provision.plan.popular')}
                    </span>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{p.name}</span>
                    <div className={cn(
                      'flex h-5 w-5 items-center justify-center rounded-full border transition-all',
                      selected ? 'border-primary bg-primary text-primary-foreground' : 'border-border',
                    )}>
                      {selected && <Check className="h-3 w-3" strokeWidth={3} />}
                    </div>
                  </div>

                  <p className="mt-1 font-mono text-[10px] text-muted-foreground/70">{p.description}</p>

                  <div className="mt-3 flex items-baseline gap-1">
                    {p.contactSales ? (
                      <span className="font-display text-xl font-bold">Sur devis</span>
                    ) : (
                      <>
                        <span className="font-display text-2xl font-bold">
                          {displayPrice?.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                        </span>
                        <span className="text-xs text-muted-foreground">€/mois</span>
                      </>
                    )}
                  </div>

                  {!p.contactSales && (
                    <p className="mt-0.5 font-mono text-[10px] text-muted-foreground/60">
                      {billing === 'annual' ? 'facturé annuellement' : 'facturé mensuellement'}
                    </p>
                  )}

                  {!p.contactSales && (
                    <div className="mt-2 font-mono text-[11px] text-muted-foreground">
                      {p.users} utilisateurs
                    </div>
                  )}

                  <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                    {p.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-1.5">
                        <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </div>

        {checkout.isError && (
          <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            <XCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">{t('provision.error.title')}</p>
              <p className="mt-0.5 text-destructive/80">
                {checkout.error instanceof Error ? checkout.error.message : t('provision.error.retry')}
              </p>
            </div>
          </div>
        )}

        {/* Summary + submit */}
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card/40 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            {selectedPlan.contactSales ? (
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Contactez-nous pour un devis personnalisé.</span>
              </div>
            ) : check === 'available' ? (
              <div className="flex items-center gap-2 text-success">
                <CheckCircle2 className="h-4 w-4" />
                <span>{t('provision.summary.ready', { subdomain, plan: selectedPlan.name })}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{t('provision.summary.fillFields')}</span>
              </div>
            )}
          </div>
          {selectedPlan.contactSales ? (
            <a
              href="mailto:contact@fereloo.com"
              className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg bg-primary px-5 font-bold text-[11px] uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
            >
              Contacter les ventes
            </a>
          ) : (
            <Button
              onClick={() => checkout.mutate()}
              disabled={!canSubmit}
              className="glow-primary shrink-0"
            >
              {checkout.isPending ? (
                <>
                  <ProvisioningSpinner size="xs" />
                  Redirection vers le paiement...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4" />
                  Payer et lancer
                </>
              )}
            </Button>
          )}
        </div>

      </div>
    </div>
  );
}

function SubdomainStatus({ state }: { state: SubdomainCheck }) {
  const { t } = useTranslation();
  if (state === 'idle') return null;

  const config: Record<Exclude<SubdomainCheck, 'idle'>, { key: string; icon: React.ReactNode; cls: string }> = {
    checking: {
      key: 'provision.subdomainStatus.checking',
      icon: <ProvisioningSpinner size="xs" className="text-muted-foreground" />,
      cls: 'text-muted-foreground',
    },
    available: {
      key: 'provision.subdomainStatus.available',
      icon: <CheckCircle2 className="h-3.5 w-3.5" />,
      cls: 'text-success',
    },
    taken: {
      key: 'provision.subdomainStatus.taken',
      icon: <XCircle className="h-3.5 w-3.5" />,
      cls: 'text-destructive',
    },
    invalid: {
      key: 'provision.subdomainStatus.invalid',
      icon: <XCircle className="h-3.5 w-3.5" />,
      cls: 'text-destructive',
    },
  };

  const { key, icon, cls } = config[state];
  return (
    <p className={cn('flex items-center gap-1.5 font-mono text-xs', cls)}>
      {icon}
      {t(key)}
    </p>
  );
}
