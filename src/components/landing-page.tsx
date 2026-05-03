import { useState, useEffect } from 'react';
import {
  ArrowRight,
  Check,
  Zap,
  LayoutDashboard,
  Database,
  Cloud,
  Rocket,
  ShieldCheck,
  BarChart3,
  Users,
  Menu,
  X
} from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/use-auth';
import { PLANS } from '@/lib/types';
import { cn } from '@/lib/utils';

const FEATURES = [
  { 
    title: 'Isolation Totale', 
    desc: 'Chaque client dispose de sa propre base MariaDB et son cache Redis.',
    icon: ShieldCheck 
  },
  { 
    title: 'Déploiement Éclair', 
    desc: 'Votre CRM est prêt en moins de 90 secondes après l\'inscription.',
    icon: Rocket 
  },
  { 
    title: 'Paiement Local', 
    desc: 'Facturation adaptée : Wave, Mobile Money et devises locales.',
    icon: BarChart3 
  },
  { 
    title: 'Support Africain', 
    desc: 'Une équipe basée en Afrique de l\'Ouest pour vous accompagner.',
    icon: Users 
  },
];

const STATS = [
  { label: 'Entreprises', value: '500+' },
  { label: 'Disponibilité', value: '99,9%' },
  { label: 'Pays', value: '12+' },
];

export function LandingPage() {
  const { signIn, user, loading } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate({ to: '/dashboard' });
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      
      {/* Decorative Gradient Top */}
      <div className="absolute inset-x-0 top-0 h-[500px] pointer-events-none opacity-50" 
           style={{ background: 'radial-gradient(circle at 50% -10%, oklch(0.55 0.22 295 / 0.1) 0%, transparent 70%)' }} />

      {/* ── NAVIGATION ── */}
      <nav className="relative z-50 mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
            <Zap className="h-6 w-6" fill="currentColor" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground font-display">Fereloo</span>
        </div>

        <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-muted-foreground">
          <a href="#fonctionnalites" className="hover:text-primary transition-colors">Fonctionnalités</a>
          <a href="#tarifs" className="hover:text-primary transition-colors">Tarifs</a>
          <Button variant="ghost" onClick={() => signIn()} className="hover:bg-primary/5">Connexion</Button>
          <Button onClick={() => signIn()} className="px-6 shadow-xl shadow-primary/20">Essai Gratuit</Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6 text-center">
             <a href="#fonctionnalites" onClick={() => setMobileOpen(false)} className="text-xl font-bold">Fonctionnalites</a>
             <a href="#tarifs" onClick={() => setMobileOpen(false)} className="text-xl font-bold">Tarifs</a>
             <hr className="border-border" />
             <Button size="lg" onClick={() => signIn()} className="w-full py-8 text-lg font-bold">Démarrer</Button>
          </div>
        </div>
      )}

      {/* ── HERO SECTION ── */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-24 md:pt-28 md:pb-40 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Disponible partout en Afrique
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-8 font-display">
          Le CRM qui parle <br className="hidden sm:block" />
          <span className="text-primary italic">votre langue.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 font-medium">
          Déployez votre propre instance Frappe CRM en un clic. Sécurisé, isolé et facturé localement pour les entreprises ambitieuses.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button size="lg" onClick={() => signIn()} className="h-14 px-10 text-lg font-bold shadow-2xl shadow-primary/30 w-full sm:w-auto transition-transform hover:scale-105 active:scale-95">
            Démarrer gratuitement <ArrowRight className="ml-2" />
          </Button>
          <div className="text-sm text-muted-foreground font-semibold">
            Sans carte bancaire · Installé en 90s
          </div>
        </div>

        {/* Hero Image / Dashboard Mockup */}
        <div className="relative mx-auto max-w-5xl rounded-2xl border-[8px] border-secondary bg-secondary/50 shadow-2xl overflow-hidden animate-fade-up">
          <img src="/placeholder.svg" alt="Dashboard Preview" className="w-full aspect-[16/9] object-cover opacity-80" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="p-6 bg-background/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl flex items-center gap-6 animate-pulse">
                <LayoutDashboard className="h-12 w-12 text-primary" />
                <div className="text-left text-sm font-bold">
                   <div>INITIALISATION SYSTÈME...</div>
                   <div className="text-muted-foreground">Déploiement de votre instance Frappe</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="fonctionnalites" className="bg-secondary/30 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-display">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 border-y border-border">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
             {STATS.map((s, i) => (
               <div key={i}>
                  <div className="text-5xl md:text-6xl font-black text-primary mb-2 font-display">{s.value}</div>
                  <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{s.label}</div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="tarifs" className="mx-auto max-w-7xl px-6 py-24 md:py-40">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-display tracking-tight">Des tarifs adaptés</h2>
          <p className="text-muted-foreground text-lg font-medium">Facturation simple en FCFA. Sans engagement.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((p) => (
            <div key={p.id} className={cn(
              "p-10 rounded-[2rem] border-2 transition-all flex flex-col",
              p.highlighted 
                ? "border-primary bg-white shadow-2xl shadow-primary/10 scale-105 z-10" 
                : "border-border bg-card/50 hover:border-primary/20"
            )}>
              <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">{p.name}</div>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-black font-display">{p.priceFcfa.toLocaleString('fr-FR')}</span>
                <span className="text-muted-foreground font-bold">FCFA{p.period}</span>
              </div>
              
              <ul className="flex-1 space-y-4 mb-10 text-sm font-semibold">
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> {p.users} Utilisateurs</li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> {p.storageGb} Go Stockage</li>
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary" /> {f}
                  </li>
                ))}
              </ul>

              <Button 
                onClick={() => signIn()}
                size="lg" 
                variant={p.highlighted ? 'default' : 'outline'} 
                className={cn("w-full py-6 font-bold", p.highlighted && "shadow-lg shadow-primary/20")}
              >
                Choisir {p.name}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-secondary/20 pt-20 pb-10 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                <Zap className="h-5 w-5" fill="currentColor" />
             </div>
             <span className="text-xl font-bold tracking-tight font-display">Fereloo</span>
          </div>
          <div className="flex gap-10 text-sm font-bold text-muted-foreground">
             <a href="#" className="hover:text-primary transition-colors">Confidentialité</a>
             <a href="#" className="hover:text-primary transition-colors">Conditions</a>
             <a href="mailto:hello@fereloo.com" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <div className="text-xs font-semibold text-muted-foreground/60">
             © {new Date().getFullYear()} Fereloo Inc. · Fait en Afrique
          </div>
        </div>
      </footer>

    </div>
  );
}
