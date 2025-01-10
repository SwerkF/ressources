FROM node:18

# Install basic development tools
RUN apt update && apt install -y less git

# Install Prisma CLI globally as root
RUN npm install -g prisma

# Set permissions
RUN mkdir -p /home/node/.npm && \
    chown -R node:node /home/node && \
    chown -R node:node /usr/local/lib/node_modules

WORKDIR /workspace

USER node