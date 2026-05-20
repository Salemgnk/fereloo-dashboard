import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

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
      },
      status: {
        active: "Actif",
        provisioning: "En cours",
        failed: "Échoué",
        suspended: "Suspendu",
      },
      provision: {
        pageTitle: "Créer votre CRM Fereloo",
        pageDesc: "Créez votre CRM Fereloo en quelques minutes : choisissez votre adresse et votre formule.",
        backToDashboard: "Retour au tableau de bord",
        title: "Créer votre CRM Fereloo",
        subtitle: "Choisissez votre adresse et votre formule. Votre CRM est prêt en quelques minutes.",
        subdomain: {
          sectionTitle: "Adresse de votre CRM",
          sectionDesc: "L'URL de votre espace Fereloo",
          label: "Nom de votre espace",
          placeholder: "ma-boutique",
          suffix: ".fereloo.com",
          hint: "Lettres minuscules, chiffres, tirets uniquement · 3 à 30 caractères",
        },
        subdomainStatus: {
          checking: "Vérification de la disponibilité…",
          available: "Sous-domaine disponible",
          taken: "Sous-domaine déjà pris",
          invalid: "Format invalide — 3-30 caractères, [a-z0-9-] uniquement, sans tiret en début/fin",
        },
        plan: {
          sectionTitle: "Formule",
          sectionDesc: "Choisissez votre plan",
          label: "Plan",
          popular: "Populaire",
        },
        error: {
          title: "La création de votre CRM a échoué",
          retry: "Réessayez dans quelques instants.",
        },
        summary: {
          ready: "Votre CRM sera accessible sur {{subdomain}}.fereloo.com — {{plan}}",
          fillFields: "Remplissez les champs ci-dessus pour continuer",
        },
        submit: {
          pending: "Création en cours…",
          confirm: "Confirmer et créer votre CRM Fereloo",
        },
      },
      statusPage: {
        pageTitle: "Déploiement en cours — Fereloo",
        pageDesc: "Votre CRM Fereloo est en cours de déploiement.",
        loading: "Connexion…",
        notFound: {
          title: "Instance introuvable",
          desc: "Cette instance n'existe pas ou a été supprimée.",
          back: "Retour au tableau de bord",
        },
        ready: {
          badge: "Déploiement terminé",
          title: "Votre CRM est prêt.",
          subtitle: "Accessible sur {{subdomain}}.fereloo.com",
          openCrm: "Ouvrir votre CRM Fereloo",
          back: "Retour au tableau de bord",
        },
        failed: {
          badge: "Échec du déploiement",
          title: "Une erreur s'est produite.",
          retry: "Relancer le déploiement",
          back: "Retour au tableau de bord",
        },
        provisioning: {
          badge: "Déploiement en cours",
          live: "En direct",
        },
        tips: [
          "Votre base de données est isolée — aucune ressource partagée avec d'autres clients.",
          "Un certificat SSL est automatiquement généré pour sécuriser votre accès.",
          "Votre instance Redis dédiée garantit des performances optimales.",
          "L'installation complète prend en moyenne 3 à 5 minutes.",
          "Vos données sont hébergées en Afrique de l'Ouest pour une latence minimale.",
          "Vous recevrez un accès administrateur complet à votre CRM Fereloo.",
          "Chaque instance est déployée dans un environnement Docker isolé.",
          "Votre CRM sera accessible 24h/24 avec une disponibilité garantie de 99,9 %.",
        ],
      },
      checklist: {
        title: "Mise en route",
        progress: "{{done}} / {{total}} étapes complétées",
        allDone: "Configuration terminée !",
        hide: "Masquer",
        steps: {
          account: {
            label: "Créer un compte",
            description: "Inscription et connexion à Fereloo.",
          },
          company: {
            label: "Renseigner votre entreprise",
            description: "Nom et secteur d'activité.",
          },
          instance: {
            label: "Déployer une instance CRM",
            description: "Lancer votre environnement Fereloo CRM.",
            action: "Déployer",
          },
          access: {
            label: "Accéder à votre CRM",
            description: "Se connecter et créer vos premiers contacts.",
            action: "Ouvrir le CRM",
          },
        },
      },
      modal: {
        welcome: {
          badge: "Bienvenue sur Fereloo",
          title: "Bonjour, {{firstName}} !",
          desc: "Fereloo vous permet de déployer et gérer votre CRM en quelques minutes. Avant de commencer, dites-nous un peu qui vous êtes.",
          start: "Commencer",
        },
        company: {
          step: "Étape 1 / 1",
          title: "Votre entreprise",
          subtitle: "Ces informations nous aident à personnaliser votre expérience.",
          companyName: "Nom de l'entreprise",
          companyPlaceholder: "Ex. : Acacia Group",
          sector: "Secteur d'activité",
          submit: "Accéder au tableau de bord",
        },
      },
      sectors: {
        "Commerce & Distribution": "Commerce & Distribution",
        "Services aux entreprises": "Services aux entreprises",
        "Agriculture & Agro-industrie": "Agriculture & Agro-industrie",
        "Technologie & Numérique": "Technologie & Numérique",
        "Santé & Pharmacie": "Santé & Pharmacie",
        "Éducation & Formation": "Éducation & Formation",
        "Finance & Assurance": "Finance & Assurance",
        "Logistique & Transport": "Logistique & Transport",
        "Restauration & Hôtellerie": "Restauration & Hôtellerie",
        "Autre": "Autre",
      },
      notFound: {
        desc: "La page que vous cherchez n'existe pas ou a été déplacée.",
        backHome: "Retour à l'accueil",
      },
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
      },
      status: {
        active: "Active",
        provisioning: "Provisioning",
        failed: "Failed",
        suspended: "Suspended",
      },
      provision: {
        pageTitle: "Create your Fereloo CRM",
        pageDesc: "Create your Fereloo CRM in a few minutes: choose your address and plan.",
        backToDashboard: "Back to dashboard",
        title: "Create your Fereloo CRM",
        subtitle: "Choose your address and plan. Your CRM will be ready in minutes.",
        subdomain: {
          sectionTitle: "Your CRM address",
          sectionDesc: "The URL of your Fereloo workspace",
          label: "Workspace name",
          placeholder: "my-store",
          suffix: ".fereloo.com",
          hint: "Lowercase letters, numbers, hyphens only · 3 to 30 characters",
        },
        subdomainStatus: {
          checking: "Checking availability…",
          available: "Subdomain available",
          taken: "Subdomain already taken",
          invalid: "Invalid format — 3-30 characters, [a-z0-9-] only, no leading/trailing hyphen",
        },
        plan: {
          sectionTitle: "Plan",
          sectionDesc: "Choose your plan",
          label: "Plan",
          popular: "Popular",
        },
        error: {
          title: "CRM creation failed",
          retry: "Please try again in a moment.",
        },
        summary: {
          ready: "Your CRM will be accessible at {{subdomain}}.fereloo.com — {{plan}}",
          fillFields: "Fill in the fields above to continue",
        },
        submit: {
          pending: "Creating…",
          confirm: "Confirm and create your Fereloo CRM",
        },
      },
      statusPage: {
        pageTitle: "Deployment in progress — Fereloo",
        pageDesc: "Your Fereloo CRM is being deployed.",
        loading: "Connecting…",
        notFound: {
          title: "Instance not found",
          desc: "This instance does not exist or has been deleted.",
          back: "Back to dashboard",
        },
        ready: {
          badge: "Deployment complete",
          title: "Your CRM is ready.",
          subtitle: "Accessible at {{subdomain}}.fereloo.com",
          openCrm: "Open your Fereloo CRM",
          back: "Back to dashboard",
        },
        failed: {
          badge: "Deployment failed",
          title: "An error occurred.",
          retry: "Retry deployment",
          back: "Back to dashboard",
        },
        provisioning: {
          badge: "Deploying",
          live: "Live",
        },
        tips: [
          "Your database is isolated — no shared resources with other clients.",
          "An SSL certificate is automatically generated to secure your access.",
          "Your dedicated Redis instance ensures optimal performance.",
          "Full installation takes an average of 3 to 5 minutes.",
          "Your data is hosted in West Africa for minimal latency.",
          "You will receive full administrator access to your Fereloo CRM.",
          "Each instance is deployed in an isolated Docker environment.",
          "Your CRM will be available 24/7 with a guaranteed 99.9% uptime.",
        ],
      },
      checklist: {
        title: "Getting started",
        progress: "{{done}} / {{total}} steps completed",
        allDone: "Setup complete!",
        hide: "Hide",
        steps: {
          account: {
            label: "Create an account",
            description: "Sign up and log in to Fereloo.",
          },
          company: {
            label: "Set up your company",
            description: "Company name and industry.",
          },
          instance: {
            label: "Deploy a CRM instance",
            description: "Launch your Fereloo CRM environment.",
            action: "Deploy",
          },
          access: {
            label: "Access your CRM",
            description: "Log in and create your first contacts.",
            action: "Open CRM",
          },
        },
      },
      modal: {
        welcome: {
          badge: "Welcome to Fereloo",
          title: "Hello, {{firstName}}!",
          desc: "Fereloo lets you deploy and manage your CRM in minutes. Before you start, tell us a bit about yourself.",
          start: "Get started",
        },
        company: {
          step: "Step 1 / 1",
          title: "Your company",
          subtitle: "This information helps us personalize your experience.",
          companyName: "Company name",
          companyPlaceholder: "e.g. Acacia Group",
          sector: "Industry",
          submit: "Access dashboard",
        },
      },
      sectors: {
        "Commerce & Distribution": "Trade & Distribution",
        "Services aux entreprises": "Business Services",
        "Agriculture & Agro-industrie": "Agriculture & Agro-industry",
        "Technologie & Numérique": "Technology & Digital",
        "Santé & Pharmacie": "Health & Pharmacy",
        "Éducation & Formation": "Education & Training",
        "Finance & Assurance": "Finance & Insurance",
        "Logistique & Transport": "Logistics & Transport",
        "Restauration & Hôtellerie": "Food & Hospitality",
        "Autre": "Other",
      },
      notFound: {
        desc: "The page you're looking for doesn't exist or has been moved.",
        backHome: "Back to home",
      },
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
      },
      status: {
        active: "Aktiv",
        provisioning: "In Bearbeitung",
        failed: "Fehlgeschlagen",
        suspended: "Gesperrt",
      },
      provision: {
        pageTitle: "Ihr Fereloo CRM erstellen",
        pageDesc: "Erstellen Sie Ihr Fereloo CRM in wenigen Minuten: Wählen Sie Ihre Adresse und Ihren Plan.",
        backToDashboard: "Zurück zum Dashboard",
        title: "Ihr Fereloo CRM erstellen",
        subtitle: "Wählen Sie Ihre Adresse und Ihren Plan. Ihr CRM ist in wenigen Minuten bereit.",
        subdomain: {
          sectionTitle: "Ihre CRM-Adresse",
          sectionDesc: "Die URL Ihres Fereloo-Arbeitsbereichs",
          label: "Name Ihres Arbeitsbereichs",
          placeholder: "mein-geschaeft",
          suffix: ".fereloo.com",
          hint: "Nur Kleinbuchstaben, Zahlen und Bindestriche · 3 bis 30 Zeichen",
        },
        subdomainStatus: {
          checking: "Verfügbarkeit wird geprüft…",
          available: "Subdomain verfügbar",
          taken: "Subdomain bereits vergeben",
          invalid: "Ungültiges Format — 3-30 Zeichen, nur [a-z0-9-], kein Bindestrich am Anfang/Ende",
        },
        plan: {
          sectionTitle: "Tarif",
          sectionDesc: "Wählen Sie Ihren Plan",
          label: "Plan",
          popular: "Beliebt",
        },
        error: {
          title: "CRM-Erstellung fehlgeschlagen",
          retry: "Bitte versuchen Sie es in einem Moment erneut.",
        },
        summary: {
          ready: "Ihr CRM ist unter {{subdomain}}.fereloo.com erreichbar — {{plan}}",
          fillFields: "Füllen Sie die obigen Felder aus, um fortzufahren",
        },
        submit: {
          pending: "Wird erstellt…",
          confirm: "Bestätigen und Fereloo CRM erstellen",
        },
      },
      statusPage: {
        pageTitle: "Bereitstellung läuft — Fereloo",
        pageDesc: "Ihr Fereloo CRM wird gerade bereitgestellt.",
        loading: "Verbindung wird hergestellt…",
        notFound: {
          title: "Instanz nicht gefunden",
          desc: "Diese Instanz existiert nicht oder wurde gelöscht.",
          back: "Zurück zum Dashboard",
        },
        ready: {
          badge: "Bereitstellung abgeschlossen",
          title: "Ihr CRM ist bereit.",
          subtitle: "Erreichbar unter {{subdomain}}.fereloo.com",
          openCrm: "Fereloo CRM öffnen",
          back: "Zurück zum Dashboard",
        },
        failed: {
          badge: "Bereitstellung fehlgeschlagen",
          title: "Ein Fehler ist aufgetreten.",
          retry: "Bereitstellung erneut starten",
          back: "Zurück zum Dashboard",
        },
        provisioning: {
          badge: "Wird bereitgestellt",
          live: "Live",
        },
        tips: [
          "Ihre Datenbank ist isoliert — keine gemeinsamen Ressourcen mit anderen Kunden.",
          "Ein SSL-Zertifikat wird automatisch generiert, um Ihren Zugang zu sichern.",
          "Ihre dedizierte Redis-Instanz gewährleistet optimale Leistung.",
          "Die vollständige Installation dauert durchschnittlich 3 bis 5 Minuten.",
          "Ihre Daten werden in Westafrika gehostet, um die Latenz zu minimieren.",
          "Sie erhalten vollen Administratorzugang zu Ihrem Fereloo CRM.",
          "Jede Instanz wird in einer isolierten Docker-Umgebung bereitgestellt.",
          "Ihr CRM ist rund um die Uhr mit einer garantierten Verfügbarkeit von 99,9 % verfügbar.",
        ],
      },
      checklist: {
        title: "Erste Schritte",
        progress: "{{done}} / {{total}} Schritte abgeschlossen",
        allDone: "Einrichtung abgeschlossen!",
        hide: "Ausblenden",
        steps: {
          account: {
            label: "Konto erstellen",
            description: "Registrieren und bei Fereloo anmelden.",
          },
          company: {
            label: "Unternehmen einrichten",
            description: "Unternehmensname und Branche.",
          },
          instance: {
            label: "CRM-Instanz bereitstellen",
            description: "Starten Sie Ihre Fereloo CRM-Umgebung.",
            action: "Bereitstellen",
          },
          access: {
            label: "Auf Ihr CRM zugreifen",
            description: "Anmelden und erste Kontakte erstellen.",
            action: "CRM öffnen",
          },
        },
      },
      modal: {
        welcome: {
          badge: "Willkommen bei Fereloo",
          title: "Hallo, {{firstName}}!",
          desc: "Mit Fereloo können Sie Ihr CRM in wenigen Minuten bereitstellen und verwalten. Bevor Sie beginnen, erzählen Sie uns etwas über sich.",
          start: "Loslegen",
        },
        company: {
          step: "Schritt 1 / 1",
          title: "Ihr Unternehmen",
          subtitle: "Diese Informationen helfen uns, Ihre Erfahrung zu personalisieren.",
          companyName: "Unternehmensname",
          companyPlaceholder: "z. B. Acacia Group",
          sector: "Branche",
          submit: "Zum Dashboard",
        },
      },
      sectors: {
        "Commerce & Distribution": "Handel & Vertrieb",
        "Services aux entreprises": "Unternehmensdienstleistungen",
        "Agriculture & Agro-industrie": "Landwirtschaft & Agroindustrie",
        "Technologie & Numérique": "Technologie & Digital",
        "Santé & Pharmacie": "Gesundheit & Pharmazie",
        "Éducation & Formation": "Bildung & Ausbildung",
        "Finance & Assurance": "Finanzen & Versicherung",
        "Logistique & Transport": "Logistik & Transport",
        "Restauration & Hôtellerie": "Gastronomie & Hotellerie",
        "Autre": "Sonstiges",
      },
      notFound: {
        desc: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
        backHome: "Zurück zur Startseite",
      },
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "fr",
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'fereloo_lang',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
