FROM node:13.8.0

# ENV NODE_ENV production

RUN mkdir -p /usr/src

COPY ["./package.json", "./package-lock.json", "/usr/src/"]

# NODE_ENV development

## Add source code
COPY [".", "/usr/src/"]

WORKDIR /usr/src/

## Install dependencies
RUN npm install --only=dev

# RUN npm install

EXPOSE 9000

WORKDIR /usr/src

ENTRYPOINT [ "npm", "start" ]
