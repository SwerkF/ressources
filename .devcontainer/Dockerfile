# Utiliser une image de base avec Node.js et un client MySQL
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:20

# Installer MySQL client
RUN apt-get update && apt-get install -y mysql-client

# Exposer les ports nécessaires
EXPOSE 5173 3000

# Définir le répertoire de travail
WORKDIR /workspace
