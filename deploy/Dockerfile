FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
COPY apps/api/package.json apps/api/package.json
COPY packages/application/package.json packages/application/package.json
COPY packages/config/package.json packages/config/package.json
COPY packages/contracts/package.json packages/contracts/package.json
COPY packages/domain/package.json packages/domain/package.json
COPY packages/infrastructure/package.json packages/infrastructure/package.json
RUN npm install

FROM deps AS build
WORKDIR /app
COPY . .
RUN npm run prisma:generate -w apps/api
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps ./apps
COPY --from=build /app/packages ./packages
EXPOSE 3000 50051
CMD ["npm", "run", "start", "-w", "apps/api"]
