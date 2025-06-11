# Стадия сборки фронтенда
FROM node:14.16.1-alpine AS build
ARG BRANCH_ARG
ENV BRANCH_ENV=$BRANCH_ARG

WORKDIR /frontend

# Копируем сначала package.json и package-lock.json (или yarn.lock)
# Это позволяет Docker кэшировать слой с установленными зависимостями,
# если эти файлы не менялись.
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Выводим значение BRANCH_ENV для отладки
RUN echo "BRANCH_ENV is: $BRANCH_ENV"

# Запускаем сборку
# `set -e` гарантирует, что команда завершится ошибкой, если любой из скриптов сборки упадет
RUN set -e; \
    if [ "$BRANCH_ENV" = "master" ]; then \
    echo "Running build:prod"; \
    npm run build:prod; \
    else \
    echo "Running build:dev"; \
    npm run build:dev; \
    fi

# Отладочный вывод: проверяем, создана ли папка dist
RUN echo "Listing /frontend after build:" && ls -la /frontend
RUN if [ -d "/frontend/dist" ]; then \
    echo "Listing /frontend/dist contents:" && ls -la /frontend/dist; \
    else \
    echo "/frontend/dist NOT FOUND!"; \
    exit 1; \
    fi

# Стадия финального образа с Nginx
FROM nginx:1.24.0-alpine3.17-slim AS production

# Копируем собранные статические файлы из стадии build
# Убедитесь, что путь /frontend/dist/ внутри стадии build корректен
COPY --from=build /frontend/dist/ /usr/share/nginx/html/

# Копируем конфигурацию Nginx
COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80/tcp

CMD ["nginx", "-g", "daemon off;"]