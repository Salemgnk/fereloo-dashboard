import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      nav: {
        home: "ACCUEIL",
        provision: "INSTALLATION",
        status: "STATUT",
        dashboard: "Tableau de bord",
        newInstance: "Nouvelle instance",
        changeLanguage: "Changer de langue",
        logout: "Déconnexion",
        fr: "Français",
        en: "English",
        de: "Deutsch",
      },
      dashboard: {
        title: "Tableau de bord — Fereloo",
        greeting: "Bonjour, {{name}} 👋",
        skeletonLoading: "Chargement...",
        noTenant: {
          badge: "Bienvenue sur Fereloo",
          title: "Provisionnez votre instance Fereloo CRM",
          description: "Vous n'avez pas encore d'instance. Choisissez un plan et un sous-domaine — votre CRM sera prêt en 90 secondes.",
          startProvisioning: "Lancer le provisioning",
          startProvisioningDesc: "Sous-domaine, plan, déploiement automatisé en quelques clics.",
          startButton: "Démarrer",
        },
        stats: {
          instances: "Instances",
          active: "{{count}} active",
          actives: "{{count}} actives",
          plan: "Plan actif",
          users: "{{count}} utilisateurs",
          region: "Région",
          hostedIn: "Hébergé en Afrique",
          storage: "Stockage",
          included: "Inclus dans le plan",
        },
        overview: {
          title: "Vue d'ensemble de vos instances",
          otherInstances: "Autres instances",
          instanceCount: "{{count}} instance",
          instanceCounts: "{{count}} instances",
        },
        actions: {
          deleteConfirm: "Voulez-vous vraiment supprimer cette instance ? Toutes les données seront perdues.",
          deleteTooltip: "Supprimer l'instance",
          trackDeploy: "Suivre le déploiement",
          viewError: "Voir l'erreur",
          logs: "Logs",
          openCrm: "Ouvrir votre CRM Fereloo",
          open: "Ouvrir",
          track: "Suivre",
        },
        status: {
          provisioningMsg: "Provisioning en cours — accédez aux logs pour suivre en temps réel.",
          failedMsg: "Le déploiement a échoué — consultez les logs pour le détail.",
          plan: "Plan",
          region: "Région",
          createdAt: "Créé le {{date}}",
        }
      }
    }
  },
  en: {
    translation: {
      nav: {
        home: "HOME",
        provision: "INSTALLATION",
        status: "STATUS",
        dashboard: "Dashboard",
        newInstance: "New instance",
        changeLanguage: "Change language",
        logout: "Logout",
        fr: "Français",
        en: "English",
        de: "Deutsch",
      },
      dashboard: {
        title: "Dashboard — Fereloo",
        greeting: "Hello, {{name}} 👋",
        skeletonLoading: "Loading...",
        noTenant: {
          badge: "Welcome to Fereloo",
          title: "Provision your Fereloo CRM instance",
          description: "You don't have an instance yet. Choose a plan and a subdomain — your CRM will be ready in 90 seconds.",
          startProvisioning: "Start provisioning",
          startProvisioningDesc: "Subdomain, plan, automated deployment in a few clicks.",
          startButton: "Start",
        },
        stats: {
          instances: "Instances",
          active: "{{count}} active",
          actives: "{{count}} active",
          plan: "Active plan",
          users: "{{count}} users",
          region: "Region",
          hostedIn: "Hosted in Africa",
          storage: "Storage",
          included: "Included in plan",
        },
        overview: {
          title: "Overview of your instances",
          otherInstances: "Other instances",
          instanceCount: "{{count}} instance",
          instanceCounts: "{{count}} instances",
        },
        actions: {
          deleteConfirm: "Do you really want to delete this instance? All data will be lost.",
          deleteTooltip: "Delete instance",
          trackDeploy: "Track deployment",
          viewError: "View error",
          logs: "Logs",
          openCrm: "Open your Fereloo CRM",
          open: "Open",
          track: "Track",
        },
        status: {
          provisioningMsg: "Provisioning in progress — access logs to track in real time.",
          failedMsg: "Deployment failed — check the logs for details.",
          plan: "Plan",
          region: "Region",
          createdAt: "Created on {{date}}",
        }
      }
    }
  },
  de: {
    translation: {
      nav: {
        home: "STARTSEITE",
        provision: "INSTALLATION",
        status: "STATUS",
        dashboard: "Dashboard",
        newInstance: "Neue Instanz",
        changeLanguage: "Sprache ändern",
        logout: "Abmelden",
        fr: "Français",
        en: "English",
        de: "Deutsch",
      },
      dashboard: {
        title: "Dashboard — Fereloo",
        greeting: "Hallo, {{name}} 👋",
        skeletonLoading: "Wird geladen...",
        noTenant: {
          badge: "Willkommen bei Fereloo",
          title: "Stellen Sie Ihre Fereloo CRM-Instanz bereit",
          description: "Sie haben noch keine Instanz. Wählen Sie einen Plan und eine Subdomain — Ihr CRM ist in 90 Sekunden bereit.",
          startProvisioning: "Bereitstellung starten",
          startProvisioningDesc: "Subdomain, Plan, automatisierte Bereitstellung mit wenigen Klicks.",
          startButton: "Starten",
        },
        stats: {
          instances: "Instanzen",
          active: "{{count}} aktiv",
          actives: "{{count}} aktiv",
          plan: "Aktiver Plan",
          users: "{{count}} Benutzer",
          region: "Region",
          hostedIn: "In Afrika gehostet",
          storage: "Speicher",
          included: "Im Plan enthalten",
        },
        overview: {
          title: "Übersicht Ihrer Instanzen",
          otherInstances: "Andere Instanzen",
          instanceCount: "{{count}} Instanz",
          instanceCounts: "{{count}} Instanzen",
        },
        actions: {
          deleteConfirm: "Möchten Sie diese Instanz wirklich löschen? Alle Daten gehen verloren.",
          deleteTooltip: "Instanz löschen",
          trackDeploy: "Bereitstellung verfolgen",
          viewError: "Fehler anzeigen",
          logs: "Protokolle",
          openCrm: "Fereloo CRM öffnen",
          open: "Öffnen",
          track: "Verfolgen",
        },
        status: {
          provisioningMsg: "Bereitstellung im Gange — Zugriff auf Protokolle zur Verfolgung in Echtzeit.",
          failedMsg: "Bereitstellung fehlgeschlagen — überprüfen Sie die Protokolle auf Details.",
          plan: "Plan",
          region: "Region",
          createdAt: "Erstellt am {{date}}",
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "fr",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
