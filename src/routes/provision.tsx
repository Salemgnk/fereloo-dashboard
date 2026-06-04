import { Outlet, createFileRoute, useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';
import { AppShell } from '@/components/app-shell';
import { ProvisioningSpinner } from '@/components/provisioning-spinner';
import { useAuth } from '@/lib/use-auth';

export const Route = createFileRoute('/provision')({
  head: () => ({
    meta: [{ title: 'Créer votre CRM Fereloo' }],
  }),
  component: ProvisionLayout,
});

function ProvisionLayout() {
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
      <Outlet />
    </AppShell>
  );
}
