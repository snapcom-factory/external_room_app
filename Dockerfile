FROM python:3.10-buster as base

RUN apt-get update
RUN apt-get install nano

WORKDIR /OBTP

RUN mkdir external_rooms_app

COPY ./external_rooms_app/ ./external_rooms_app/
RUN rm -r ./external_rooms_app/base/tmp/upload; mkdir -p ./external_rooms_app/base/tmp/upload

RUN pip install --upgrade pip

COPY ./requirements.txt ./requirements.txt
RUN pip install -r ./requirements.txt
