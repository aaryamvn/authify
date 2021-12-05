FROM node:16-alpine AS BASE

RUN apk update && apk add curl bash && rm -rf /var/cache/apk/*

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /opt/authify/

COPY ./package.json ./package.json
RUN yarn install

COPY . . 
RUN yarn build
RUN rm -rf node_modules/

# remove as many extra deps as possible
RUN yarn install
RUN /usr/local/bin/node-prune

# make new final image with only built files to save space
FROM node:16-alpine
WORKDIR /opt/authify/

# Copy built files to final image
COPY --from=BASE /opt/authify/package.json ./package.json
COPY --from=BASE /opt/authify/node_modules ./node_modules
COPY --from=BASE /opt/authify/dist ./dist

RUN yarn global add pm2
CMD ["pm2-runtime", "dist/server.js"]