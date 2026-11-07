FROM node:24-alpine
WORKDIR /app
COPY Package.json ./package.json
RUN npm install --omit=dev --no-audit --no-fund && npm cache clean --force
COPY src/ ./
USER node
EXPOSE 3000
CMD ["node", "server.js"]
