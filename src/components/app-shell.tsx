import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { ReactNode } from 'react';
import { LayoutDashboard, Plus, LogOut, Zap, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/lib/use-auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function UserAvatar({ name, email }: { name: string; email: string }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <div className="flex items-center gap-3">
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

function Breadcrumbs() {
  const { t } = useTranslation();
  const router = useRouterState();
  const path = router.location.pathname;

  const crumbs: Array<{ label: string; href?: string }> = [
    { label: t('nav.home'), href: '/' },
  ];

  if (path === '/provision') {
    crumbs.push({ label: t('nav.provision') });
  } else if (path.startsWith('/status/')) {
    crumbs.push({ label: t('nav.status') });
  }

  if (crumbs.length <= 1) return null;

  return (
    <div className="hidden items-center gap-2 font-mono text-[10px] font-bold tracking-[0.1em] text-muted-foreground/40 md:flex">
      {crumbs.map((c, i) => (
        <span key={c.label} className="flex items-center gap-2">
          {i > 0 && <span className="text-border">/</span>}
          {c.href ? (
            <Link to={c.href} className="transition hover:text-foreground">
              {c.label}
            </Link>
          ) : (
            <span className="text-foreground/70">{c.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { t, i18n } = useTranslation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Subtle top glow — same as landing */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[360px] z-0"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% -10%, oklch(0.56 0.20 230 / 0.10) 0%, transparent 70%)' }}
      />

      <header className="relative z-30 sticky top-0 border-b border-border/60 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">

          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm shadow-primary/20">
                <Zap className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
              <span className="font-display font-bold tracking-tight">Fereloo</span>
              <span className="hidden rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground sm:inline">
                console
              </span>
            </Link>

            <div className="hidden h-4 w-px bg-border md:block" aria-hidden />

            <nav className="hidden items-center gap-0.5 md:flex">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                activeProps={{
                  className: 'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm bg-accent text-foreground',
                }}
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                {t('nav.dashboard')}
              </Link>
            </nav>

            <Breadcrumbs />
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate({ to: '/provision' })}
              className="hidden h-8 gap-1.5 text-xs sm:inline-flex"
            >
              <Plus className="h-3.5 w-3.5" />
              {t('nav.newInstance')}
            </Button>

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

        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-6">
        {children}
      </main>
    </div>
  );
}
