# Build phase
FROM node:alpine AS build-stage

WORKDIR '/app'
COPY ./package*.json /app/
RUN npm install
COPY ./ /app/

ARG configuration=production

RUN npm run build -- --output-path=./dist/out --configuration $configuration

# Run phase
FROM nginx:alpine

EXPOSE 80 3000
COPY --from=build-stage /app/nginx/default.conf /etc/nginx/conf.d./default.conf
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
