import { useState } from 'react';
import { Building2, Briefcase, ArrowRight, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { SECTORS, type CompanyInfo } from '@/lib/use-onboarding';
import { cn } from '@/lib/utils';

interface Props {
  open: boolean;
  userName: string;
  onComplete: (info: CompanyInfo) => void;
}

export function OnboardingModal({ open, userName, onComplete }: Props) {
  const [step, setStep] = useState<'welcome' | 'company'>('welcome');
  const [name, setName] = useState('');
  const [sector, setSector] = useState('');

  const canSubmit = name.trim().length >= 2 && sector !== '';

  function handleSubmit() {
    if (!canSubmit) return;
    onComplete({ name: name.trim(), sector });
  }

  return (
    <Dialog open={open}>
      <DialogContent
        className="max-w-md rounded-[4px] border border-border bg-card p-0 shadow-2xl gap-0"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        hideCloseButton
      >
        {step === 'welcome' ? (
          <WelcomeStep userName={userName} onNext={() => setStep('company')} />
        ) : (
          <CompanyStep
            name={name}
            sector={sector}
            canSubmit={canSubmit}
            onNameChange={setName}
            onSectorChange={setSector}
            onSubmit={handleSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function WelcomeStep({ userName, onNext }: { userName: string; onNext: () => void }) {
  const { t } = useTranslation();
  const firstName = userName.split(' ')[0];
  return (
    <div className="flex flex-col items-center gap-8 px-10 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-[4px] border border-border bg-foreground text-background">
        <Zap className="h-7 w-7" fill="currentColor" />
      </div>

      <div className="space-y-3">
        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {t('modal.welcome.badge')}
        </div>
        <h2 className="font-display text-2xl font-bold tracking-tighter">
          {t('modal.welcome.title', { firstName })}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground font-medium text-balance">
          {t('modal.welcome.desc')}
        </p>
      </div>

      <Button
        onClick={onNext}
        className="h-11 w-full rounded-[2px] font-bold text-xs uppercase tracking-widest"
      >
        {t('modal.welcome.start')}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}

function CompanyStep({
  name,
  sector,
  canSubmit,
  onNameChange,
  onSectorChange,
  onSubmit,
}: {
  name: string;
  sector: string;
  canSubmit: boolean;
  onNameChange: (v: string) => void;
  onSectorChange: (v: string) => void;
  onSubmit: () => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8 px-10 py-10">
      <div className="space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {t('modal.company.step')}
        </div>
        <h2 className="font-display text-xl font-bold tracking-tighter">
          {t('modal.company.title')}
        </h2>
        <p className="text-sm text-muted-foreground font-medium">
          {t('modal.company.subtitle')}
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            <Building2 className="h-3.5 w-3.5" />
            {t('modal.company.companyName')}
          </Label>
          <Input
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder={t('modal.company.companyPlaceholder')}
            className="h-11 rounded-[2px] font-medium"
            autoFocus
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            <Briefcase className="h-3.5 w-3.5" />
            {t('modal.company.sector')}
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {SECTORS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onSectorChange(s)}
                className={cn(
                  'rounded-[2px] border px-3 py-2 text-left text-[11px] font-bold uppercase tracking-tight transition-colors',
                  sector === s
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground',
                )}
              >
                {t(`sectors.${s}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button
        onClick={onSubmit}
        disabled={!canSubmit}
        className="h-11 w-full rounded-[2px] font-bold text-xs uppercase tracking-widest"
      >
        {t('modal.company.submit')}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
