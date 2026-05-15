import { cn } from '@/lib/utils';

type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg';

interface Cfg {
  wh: string;
  vb: number;
  cx: number;
  r1: number;
  r2: number;
  sw1: number;
  sw2: number;
  dash1: string;
  dash2: string;
}

// Circumference ≈ 2πr. Outer arc ≈ 75% filled, inner ≈ 50%.
const CFG: Record<SpinnerSize, Cfg> = {
  xs: { wh: 'h-3.5 w-3.5', vb: 20, cx: 10, r1: 8,  r2: 4.5, sw1: 1.5, sw2: 1.2, dash1: '38 13', dash2: '14 14' },
  sm: { wh: 'h-5 w-5',     vb: 24, cx: 12, r1: 9,  r2: 5,   sw1: 1.8, sw2: 1.4, dash1: '42 14', dash2: '16 16' },
  md: { wh: 'h-8 w-8',     vb: 36, cx: 18, r1: 14, r2: 8,   sw1: 2,   sw2: 1.6, dash1: '66 22', dash2: '25 25' },
  lg: { wh: 'h-16 w-16',   vb: 72, cx: 36, r1: 28, r2: 16,  sw1: 2.5, sw2: 2,   dash1: '131 44', dash2: '50 50' },
};

export function ProvisioningSpinner({
  size = 'md',
  className,
}: {
  size?: SpinnerSize;
  className?: string;
}) {
  const c = CFG[size];

  return (
    <svg
      viewBox={`0 0 ${c.vb} ${c.vb}`}
      className={cn(c.wh, 'shrink-0', className)}
      aria-hidden
    >
      {/* Outer arc — clockwise */}
      <circle
        cx={c.cx}
        cy={c.cx}
        r={c.r1}
        fill="none"
        stroke="currentColor"
        strokeWidth={c.sw1}
        strokeDasharray={c.dash1}
        strokeLinecap="round"
        className="spinner-cw text-primary"
      />

      {/* Inner arc — counter-clockwise, lighter */}
      <circle
        cx={c.cx}
        cy={c.cx}
        r={c.r2}
        fill="none"
        stroke="currentColor"
        strokeWidth={c.sw2}
        strokeDasharray={c.dash2}
        strokeLinecap="square"
        className="spinner-ccw text-primary/40"
      />

      {/* Center dot — pulses */}
      <circle
        cx={c.cx}
        cy={c.cx}
        r={c.sw1 * 0.7}
        fill="currentColor"
        className="text-primary/70 spinner-dot"
      />
    </svg>
  );
}
