FROM node:16 as builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

FROM takayamaaren/webcontainer
COPY --from=builder /app/dist /static
ENTRYPOINT ["/usr/local/bin/webcontainer","run"]
