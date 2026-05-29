export type TenantStatus = 'provisioning' | 'active' | 'failed' | 'suspended';
export type PlanId = 'basic' | 'pro' | 'enterprise';
export type BillingPeriod = 'monthly' | 'annual';


/** The 4 fixed Fereloo CRM provisioning steps. */
export type ProvisioningStepKey = 'mariadb' | 'redis' | 'app' | 'domain';
export type ProvisioningStepStatus = 'pending' | 'running' | 'success' | 'failed';

export interface ProvisioningStep {
  key: ProvisioningStepKey;
  label: string;
  description: string;
  status: ProvisioningStepStatus;
}

export interface Plan {
  id: PlanId;
  name: string;
  description: string;
  priceFcfa: number;
  priceFcfaAnnual?: number;
  period: string;
  users: number;
  storageGb: number;
  features: string[];
  highlighted?: boolean;
  contactSales?: boolean;
}

export interface Tenant {
  id: string;
  subdomain: string;
  status: TenantStatus;
  plan: PlanId;
  createdAt: string;
  url: string;
  wizardUrl?: string;
  region: string;
}

export interface ProvisioningLog {
  id: string;
  timestamp: string;
  level: 'info' | 'success' | 'error' | 'warn';
  message: string;
}

export interface TenantStatusResponse {
  tenant: Tenant;
  progress: number; // 0-100
  steps: ProvisioningStep[];
  logs: ProvisioningLog[];
  errorMessage?: string;
}

export const PROVISIONING_STEP_DEFS: Array<Pick<ProvisioningStep, 'key' | 'label' | 'description'>> = [
  { key: 'mariadb', label: 'MariaDB', description: 'Base de données dédiée à votre CRM.' },
  { key: 'redis', label: 'Redis', description: 'Cache & file de jobs en arrière-plan.' },
  { key: 'app', label: 'Fereloo CRM', description: 'Conteneur applicatif et migrations initiales.' },
  { key: 'domain', label: 'Domaine TLS', description: 'Sous-domaine + certificat Let\'s Encrypt.' },
];

export const PLANS: Plan[] = [
  {
    id: 'basic',
    name: 'Starter',
    description: 'Freelances, coachs et solo-entrepreneurs',
    priceFcfa: 6500,
    priceFcfaAnnual: 5200,
    period: '/mois',
    users: 2,
    storageGb: 10,
    features: [
      'CRM essentiel',
      'Gestion des contacts',
      'Pipeline commercial de base',
      'Intégration WhatsApp',
      'Analytics de base',
      'Support par email',
    ],
  },
  {
    id: 'pro',
    name: 'Business',
    description: 'PME, agences et startups en croissance',
    priceFcfa: 20900,
    priceFcfaAnnual: 16720,
    period: '/mois',
    users: 7,
    storageGb: 50,
    highlighted: true,
    features: [
      'Pipeline avancé',
      'Intégration emails',
      "Accompagnement à l'onboarding",
      "Gestion d'équipe",
      'Intégrations avancées',
      'Support prioritaire',
      'Gestion de la facturation',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Grandes équipes et organisations',
    priceFcfa: 0,
    period: '',
    users: 0,
    storageGb: 0,
    contactSales: true,
    features: [
      'Utilisateurs illimités',
      'Accès API',
      'SLA garanti',
      'Onboarding dédié',
      'Sécurité avancée',
      'Support sur-mesure',
      'Options white-label',
      'Installation personnalisée',
    ],
  },
];
