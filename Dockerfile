FROM ubuntu:20.04

RUN apt update && \
    apt install -y git && \
    git config --global user.name "namyh" && \
    git config --global user.email "nsd3358@gmail.com"

WORKDIR /workspace

