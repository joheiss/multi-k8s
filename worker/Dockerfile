# Build phase
FROM node:alpine AS build-stage
WORKDIR '/app'
COPY ./package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build

# Run phase
FROM node:alpine
WORKDIR '/app'
COPY --from=build-stage /app /app
CMD ["npm", "run", "start"]