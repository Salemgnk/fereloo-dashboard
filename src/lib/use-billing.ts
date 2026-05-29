import { useSubscription } from '@clerk/clerk-react/experimental';
import { CLERK_PLAN_IDS, type PlanId } from './types';

const CLERK_TO_PLAN_ID = Object.fromEntries(
  Object.entries(CLERK_PLAN_IDS).map(([planId, clerkId]) => [clerkId, planId as PlanId]),
);

export function useBilling() {
  // useSubscription returns { data, isLoading, ... } — data is the subscription resource
  const { data: subscription, isLoading } = useSubscription();

  const isActive = subscription?.status === 'active';
  const clerkPlanId = (subscription as { plan?: { id?: string } } | undefined)?.plan?.id ?? null;
  const activePlanId: PlanId | null = clerkPlanId ? (CLERK_TO_PLAN_ID[clerkPlanId] ?? null) : null;

  function clerkPlanIdFor(plan: Exclude<PlanId, 'enterprise'>): string {
    return CLERK_PLAN_IDS[plan];
  }

  return { isLoading, isActive, activePlanId, clerkPlanIdFor };
}
