# Vite SSR with React Islands Architecture

Read more about islands architecture on [Jason's Blog about Islands Architecture](https://jasonformat.com/islands-architecture/)

[My Tweet about Vite SSR and Islands](https://twitter.com/saurabhdawaree/status/1528804944609804289?s=20&t=ehTAQiQnvE93tBntDHIhBg)

## Install Dependencies

```sh
yarn
```

## Run Dev Server

```sh
node server.js # or yarn dev
```

## Prod Build (This doesn't work right now with the islands setup)

```sh
yarn build # builds server and client code
NODE_ENV=production node server.js # or yarn serve
```


Built while following [Vite SSR docs](https://vitejs.dev/guide/ssr.html)
