export type TenantStatus = 'provisioning' | 'active' | 'failed' | 'suspended';
export type PlanId = 'basic' | 'pro' | 'enterprise';

/** The 5 fixed Frappe CRM provisioning steps. */
export type ProvisioningStepKey = 'mariadb' | 'redis' | 'app' | 'booting' | 'domain';
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
  priceFcfa: number;
  period: string;
  users: number;
  storageGb: number;
  features: string[];
  highlighted?: boolean;
}

export interface Tenant {
  id: string;
  subdomain: string;
  status: TenantStatus;
  plan: PlanId;
  createdAt: string;
  url: string;
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
  { key: 'mariadb', label: 'Base de données', description: 'Stockage dédié.' },
  { key: 'redis', label: 'Serveur Cache', description: 'Accélération système.' },
  { key: 'app', label: 'Installation', description: 'Mise en place du CRM.' },
  { key: 'booting', label: 'Démarrage', description: 'Initialisation finale (2-3 min).' },
  { key: 'domain', label: 'Accès Web', description: 'Nom de domaine et SSL.' },
];

export const PLANS: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    priceFcfa: 9990,
    period: '/mois',
    users: 5,
    storageGb: 10,
    features: [
      "Jusqu'à 5 commerciaux",
      'Suivi clients & opportunités',
      'Tableau de bord des ventes',
      'Adresse web dédiée à votre entreprise',
      'Sauvegardes automatiques quotidiennes',
      'Support par email',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    priceFcfa: 49990,
    period: '/mois',
    users: 20,
    storageGb: 100,
    highlighted: true,
    features: [
      "Jusqu'à 20 commerciaux",
      'Votre propre nom de domaine',
      'Sauvegardes toutes les heures',
      'Relances WhatsApp & SMS automatiques',
      'Encaissements Wave & Mobile Money',
      'Support prioritaire 6j/7',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    priceFcfa: 249990,
    period: '/mois',
    users: 100,
    storageGb: 500,
    features: [
      'Équipes de 100 commerciaux et plus',
      'Disponibilité garantie 99,95 %',
      'Hébergement dédié en Afrique',
      'Connexion unique (SSO) & journal des accès',
      'Accompagnement personnalisé',
      'Support 24/7',
    ],
  },
];
