FROM node:18-alpine As build
WORKDIR /app

COPY package*.json ./
RUN npm i 
COPY . .

RUN npm run build @app/api
RUN npm run build @app/payment
RUN npm run build @app/crawler

FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/.env ./.env
COPY --from=build /app/package.json ./package.json