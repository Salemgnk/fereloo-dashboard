import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/provision/cancel')({
  head: () => ({ meta: [{ title: 'Paiement annulé — Fereloo' }] }),
  component: CancelPage,
});

function CancelPage() {
  return (
    <div className="mx-auto max-w-md py-24 text-center">
      <XCircle className="mx-auto h-12 w-12 text-muted-foreground" />
      <h1 className="mt-4 font-display text-2xl font-bold">Paiement annulé</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Aucun montant n&apos;a été débité. Vous pouvez relancer le processus quand vous voulez.
      </p>
      <Button asChild className="mt-8">
        <Link to="/provision">
          <ArrowLeft className="h-4 w-4" />
          Retour au choix de plan
        </Link>
      </Button>
    </div>
  );
}
