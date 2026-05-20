import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ExternalLink, Globe, LogOut, Zap } from 'lucide-react';
import { useAuth } from '@/lib/use-auth';
import { getTenant } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { ProvisioningSpinner } from '@/components/provisioning-spinner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Route = createFileRoute('/crm/$tenantId')({
  head: () => ({
    meta: [{ title: 'Fereloo CRM' }],
  }),
  component: CrmPage,
});

function UserAvatar({ name, email }: { name: string; email: string }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <div className="flex items-center gap-2">
      <div className="hidden text-right md:block">
        <div className="text-[11px] font-bold uppercase tracking-tight leading-tight">{name}</div>
        <div className="font-mono text-[9px] leading-tight text-muted-foreground/60">{email}</div>
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-secondary font-mono text-[10px] font-bold text-foreground">
        {initials}
      </div>
    </div>
  );
}

function CrmPage() {
  const { t, i18n } = useTranslation();
  const { user, signOut, loading } = useAuth();
  const router = useRouter();
  const { tenantId } = Route.useParams();

  const { data: tenant, isLoading } = useQuery({
    queryKey: ['tenant', tenantId],
    queryFn: () => getTenant(tenantId),
    enabled: !!tenantId,
  });

  useEffect(() => {
    if (!loading && !user) router.navigate({ to: '/' });
  }, [user, loading, router]);

  if (loading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <ProvisioningSpinner size="lg" />
      </div>
    );
  }

  if (!tenant || tenant.status !== 'active') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-center">
        <p className="text-sm text-muted-foreground">{t('crm.notAvailable')}</p>
        <Button asChild variant="outline" size="sm">
          <Link to="/">{t('crm.backToDashboard')}</Link>
        </Button>
      </div>
    );
  }

  const crmUrl = tenant.wizardUrl ?? tenant.url;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      {/* ── Header ── */}
      <header className="z-30 flex h-14 shrink-0 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm shadow-primary/20">
              <Zap className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
            <span className="font-display font-bold tracking-tight">Fereloo</span>
            <span className="hidden rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground sm:inline">
              CRM
            </span>
          </Link>

          <div className="hidden h-4 w-px bg-border md:block" aria-hidden />

          {/* Tenant name */}
          <span className="hidden font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground md:inline">
            {tenant.subdomain}
          </span>

          {/* Back to dashboard */}
          <Button asChild variant="ghost" size="sm" className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground">
            <Link to="/">
              <ArrowLeft className="h-3.5 w-3.5" />
              {t('crm.backToDashboard')}
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {/* Open in new tab */}
          <Button asChild variant="ghost" size="sm" className="h-8 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground">
            <a href={crmUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t('crm.openExternal')}</span>
            </a>
          </Button>

          {/* Language switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 px-2 text-muted-foreground hover:text-foreground">
                <Globe className="h-3.5 w-3.5" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
                  {i18n.language.slice(0, 2)}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => i18n.changeLanguage('fr')}>
                {t('nav.fr')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => i18n.changeLanguage('en')}>
                {t('nav.en')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => i18n.changeLanguage('de')}>
                {t('nav.de')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User */}
          {user && (
            <div className="flex items-center gap-1">
              <UserAvatar name={user.name} email={user.email} />
              <Button
                size="icon"
                variant="ghost"
                onClick={signOut}
                aria-label={t('nav.logout')}
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* ── Frappe iframe ── */}
      <iframe
        src={crmUrl}
        title="Fereloo CRM"
        className="h-full w-full flex-1 border-0"
        allow="fullscreen"
      />
    </div>
  );
}
