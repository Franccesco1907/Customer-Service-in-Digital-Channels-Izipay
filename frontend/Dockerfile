# ----------------------------
# build from source
# ----------------------------
FROM node:18-alpine AS build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install

RUN npm run build

# ----------------------------
# run with nginx
# ----------------------------

FROM nginx:latest

COPY --from=build /usr/local/app/dist/frontend /usr/share/nginx/html

EXPOSE 4200
