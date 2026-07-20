FROM mcr.microsoft.com/playwright:v1.61.1-noble

WORKDIR /app

ENV CI=true
ENV NODE_ENV=test

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx tsc --noEmit

CMD ["npx", "playwright", "test"]
