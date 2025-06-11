FROM python:3.13-alpine

COPY ../requirements.txt /temp/requirements.txt
COPY ars /ars
WORKDIR /ars
EXPOSE 8000

RUN apk --no-cache add postgresql-client build-base postgresql-dev

RUN pip install -r /temp/requirements.txt --no-cache-dir

RUN adduser --disabled-password ars-user

USER ars-user

