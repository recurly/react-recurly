FROM node:18-alpine

RUN apk add --update --no-cache make g++ python3 pkgconfig pixman-dev cairo-dev pango-dev pango

WORKDIR /usr/src/app

ADD package*.json .
RUN npm install --build-from-source

ADD . .

EXPOSE 6006

CMD ["make", "docs"]