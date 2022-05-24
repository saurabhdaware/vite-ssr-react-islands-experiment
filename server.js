const fs = require('fs')
const path = require('path')
const express = require('express')
const { createServer: createViteServer } = require('vite')

const isProd = process.env.NODE_ENV === 'production';
const SERVER_PORT = 3000;
const CLIENT_OUT = isProd ? path.resolve(__dirname, 'dist', 'client') : __dirname;
const ENTRY_SERVER_PATH = isProd ? './dist/server/entry-server.js' : '/src/entry-server.jsx';
// const INDEX_HTML_PATH = path.join(CLIENT_OUT, 'index.html');

async function createServer() {
  const app = express()

  // Create Vite server in middleware mode. This disables Vite's own HTML
  // serving logic and let the parent server take control.
  //
  // If you want to use Vite's own HTML serving logic (using Vite as
  // a development middleware), using 'html' instead.
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' }
  })
  // use vite's connect instance as middleware
  app.use(vite.middlewares)

  if (isProd) {
    app.use('/assets', express.static(path.join(CLIENT_OUT, 'assets')));
  }

  app.use('*', async (req, res) => {
    const url = req.originalUrl
  
    try {
      let render;
      if (isProd) {
        ({ render } = require(ENTRY_SERVER_PATH));

      } else {
        ({ render } = await vite.ssrLoadModule(ENTRY_SERVER_PATH));
      }


  
      // 4. render the app HTML. This assumes entry-server.js's exported `render`
      //    function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      let appHtml = await render(url)
  
      appHtml = await vite.transformIndexHtml(url, appHtml)

      // 5. Inject the app-rendered HTML into the template.
  
      // 6. Send the rendered HTML back.
      res.status(200).set({ 'Content-Type': 'text/html' }).end(appHtml)
    } catch (e) {
      // If an error is caught, let Vite fix the stracktrace so it maps back to
      // your actual source code.
      vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`);
  })
}

createServer()