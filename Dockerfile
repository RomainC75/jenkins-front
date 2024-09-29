FROM cypress/factory

ARG NODE_VERSION='18.17.1'
ARG CHROME_VERSION='113.0.5672.92-1'
ARG EDGE_VERSION='113.0.1774.42-1'
ARG FIREFOX_VERSION='113.0'

WORKDIR /TESTS

COPY ./package.json .
COPY ./cypress.config.ts .
COPY ./cypress ./cypress

RUN npm i

ENTRYPOINT ["npx","cypress","run"]