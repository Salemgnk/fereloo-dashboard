# Utilisation de Node 22 comme requis par TanStack Start
FROM node:22-alpine

WORKDIR /app

# 1. Installation des dépendances (on a besoin des devDeps pour 'vite preview')
COPY package.json package-lock.json* ./
RUN npm install

# 2. Copie du code et build
COPY . .

# Variables injectées au build par Dokploy (docker build --build-arg)
ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_API_URL=https://api.fereloo.com
ARG VITE_CLERK_PLAN_STARTER
ARG VITE_CLERK_PLAN_BUSINESS
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_CLERK_PLAN_STARTER=$VITE_CLERK_PLAN_STARTER
ENV VITE_CLERK_PLAN_BUSINESS=$VITE_CLERK_PLAN_BUSINESS
ENV NODE_ENV=production

# Build de l'application
RUN npm run build

# 3. Exposition du port 80
EXPOSE 80

# 4. Lancement via 'vite preview' qui est le seul mode qui a fonctionné au test local
# On force le port 80 et l'écoute sur toutes les interfaces
CMD ["npm", "run", "preview", "--", "--port", "80", "--host", "0.0.0.0"]
