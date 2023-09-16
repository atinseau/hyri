import { render } from 'hyri-preact-render-to-string';
import { Context } from "elysia";
import { HyriRootComponent } from "../../types/render";
import { serverContext } from '../context';

type CreateHtmlTreeOptions = {
  scriptPaths?: string[]
}

const generateImportMap = () => {
  return {
    "imports": {
      "hyri-preact": "/_hyri/preact.js",
      "hyri-preact/jsx-dev-runtime": "/_hyri/jsx-runtime.js",
      "hyri-preact/hooks": "/_hyri/hooks.js",
    }
  }
}

const createHtmlTree = (body: string, options?: CreateHtmlTreeOptions) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script type="importmap">
${JSON.stringify(generateImportMap())}
    </script>
    <script type="module" src="/_hyri/jsx-runtime.js"></script>
    <script type="module" src="/_hyri/preact.js" type="module"></script>
  </head>
  <body>
    <div id="root">${body}</div>
    ${options?.scriptPaths
      ? options?.scriptPaths?.map((scriptPath) => {
        return `<script type="module" src="${scriptPath}"></script>`
      })
      : ""
    }
  </body>
</html>
`
}

const renderTree = (component: HyriRootComponent, viewScriptPath: string | undefined, req: Context<any>) => {
  try {
    const tree = component({
      params: req.params
    })
    if (!tree) {
      throw new Error("Could not render tree")
    }
    const rendered = render(tree)
    return createHtmlTree(rendered, {
      scriptPaths: viewScriptPath ? [
        viewScriptPath
      ] : []
    })
  } catch (e) {
    return createHtmlTree((e as Error)?.message || "An error occured")
  }
}

export {
  createHtmlTree,
  renderTree
}
