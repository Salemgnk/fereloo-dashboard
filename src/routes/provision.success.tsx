import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Mail } from 'lucide-react';
import { ProvisioningSpinner } from '@/components/provisioning-spinner';
import { getBillingSession } from '@/lib/api';

export const Route = createFileRoute('/provision/success')({
  head: () => ({ meta: [{ title: 'Paiement confirmé — Fereloo' }] }),
  validateSearch: (search: Record<string, unknown>) => ({
    session_id: (search.session_id as string) ?? '',
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const navigate = useNavigate();
  const { session_id: sessionId } = Route.useSearch();
  const [failed, setFailed] = useState(false);
  const attempts = useRef(0);

  useEffect(() => {
    if (!sessionId) { setFailed(true); return; }

    const poll = async () => {
      attempts.current += 1;
      const data = await getBillingSession(sessionId);
      if (data?.tenant_id) {
        navigate({ to: '/status/$tenantId', params: { tenantId: data.tenant_id } });
        return;
      }
      if (attempts.current >= 10) { setFailed(true); return; }
      setTimeout(poll, 2000);
    };

    setTimeout(poll, 1500);
  }, [sessionId, navigate]);

  if (failed) {
    return (
      <div className="mx-auto max-w-md py-24 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
        <h1 className="mt-4 font-display text-2xl font-bold">Paiement reçu</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Votre paiement a bien été traité. Votre espace est en cours de configuration.
        </p>
        <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          Si votre espace n&apos;apparaît pas dans 5 minutes, contactez{' '}
          <a href="mailto:support@fereloo.com" className="text-primary underline">
            support@fereloo.com
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md py-24 text-center">
      <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
      <h1 className="mt-4 font-display text-2xl font-bold">Paiement confirmé</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Votre CRM Fereloo est en cours de configuration…
      </p>
      <ProvisioningSpinner size="lg" className="mx-auto mt-8" />
    </div>
  );
}
