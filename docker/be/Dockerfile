# backend dockerfile
FROM ubuntu:18.04
RUN mkdir /app
WORKDIR /app

RUN apt-get update && \
  apt-get install -y build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev xz-utils tk-dev libffi-dev liblzma-dev python3-openssl git && \
  mkdir ~/python38 && \
  cd ~/python38 && \
  wget https://www.python.org/ftp/python/3.8.16/Python-3.8.16.tgz && \
  tar -xf Python-3.8.16 && \
  cd Python-3.8.16 && \
  ./configure --enable-optimizations && \
  make -j$(nproc) && \
  make install
COPY ./requirements.txt ./backend/ /app
COPY ./docker/be/docker-entrypoint.sh /usr/local/bin/
RUN chmod 755 /usr/local/bin/docker-entrypoint.sh
RUN python3.8 -m pip install --upgrade pip \
  && python3.8 -m pip install --upgrade setuptools wheel \
  && python3.8 -m pip install -r requirements.txt
ENTRYPOINT docker-entrypoint.sh
