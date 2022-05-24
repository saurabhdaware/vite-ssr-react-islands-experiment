import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

type PartialHydrationOptions = {
  type?: 'static' | 'immediate';
}
async function partialHydrate(componentPath, options?: PartialHydrationOptions) {
  const Component = (await import(componentPath)).default;

  if (options?.type === 'static') {
    return renderToStaticMarkup(<Component />);
  }

  const id = componentPath.replace(/\//g, '-').toLowerCase();

  return `
    <div id="${id}">${renderToString(<Component />)}</div>
    <script type="module">
      import React from 'react';
      import { hydrateRoot } from 'react-dom/client';
      import Component from ${JSON.stringify(componentPath)};
      hydrateRoot(document.querySelector('#${id}'), React.createElement(Component))
    </script>
  `;
}

async function Skeleton() {
  return (
    /* html */
    `<html>
      <head>
      </head>
      <body>
      ${(await partialHydrate('/src/Navbar'))}
      ${(await partialHydrate('/src/Footer', { type: 'static' }))}
      </body>
    </html>`
  )
}

export default Skeleton;