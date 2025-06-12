FROM node:14.16.1-alpine as build
ARG BRANCH_ARG
ENV BRANCH_ENV=$BRANCH_ARG

WORKDIR /frontend

COPY . .

RUN npm install
RUN test "$BRANCH_ENV" = "master" && npm run build:prod || npm run build:dev


FROM nginx:1.24.0-alpine3.17-slim

COPY --from=build /app/build/ /usr/share/nginx/html


COPY ./default.conf /etc/nginx/conf.d/


EXPOSE 80/tcp

CMD ["nginx", "-g", "daemon off;"]

