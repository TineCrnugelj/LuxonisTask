# Use the same base image
FROM node:20 as BUILD_IMAGE

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20 as PRODUCTION_IMAGE
WORKDIR /app/frontend

COPY --from=BUILD_IMAGE /app/frontend/dist/ /app/frontend/dist/
EXPOSE 8080

COPY package.json .
COPY vite.config.ts .
RUN npm install typescript
EXPOSE 8080

CMD ["npm", "run", "preview"]