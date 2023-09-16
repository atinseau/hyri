import { render } from 'hyri-preact-render-to-string';
import { Context } from "elysia";
import { HyriRootComponent } from "../../types/render";

type CreateHtmlTreeOptions = {
  scriptPaths?: string[]
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
{
  "imports": {
    "preact": "/_hyri/preact.mjs",
    "preact/jsx-dev-runtime": "/_hyri/jsxRuntime.mjs"
  }
}
    </script>
    <script type="module" src="/_hyri/jsxRuntime.mjs"></script>
    <script src="/_hyri/preact.mjs" type="module"></script>
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
