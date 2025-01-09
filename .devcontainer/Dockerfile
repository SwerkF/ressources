FROM node:18

# Install basic development tools
RUN apt update && apt install -y less git

# Ensure default `node` user has access to `npm` cache
RUN mkdir -p /home/node/.npm && \
    chown -R node:node /home/node

WORKDIR /workspace

USER node