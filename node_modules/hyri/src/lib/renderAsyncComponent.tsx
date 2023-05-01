import { RenderToReadableStreamOptions, renderToReadableStream } from 'react-dom/server'
import { Document } from 'hyri/src/components/Document'
import {
  BOOTSTRAP_FILES
} from 'utils/constants'

async function renderAsyncComponent(Component: AsyncComponent) {

  const renderToReadableStreamOptions: RenderToReadableStreamOptions = {
    bootstrapScripts: BOOTSTRAP_FILES.map((file) => `/_hyri/chunks/${file.output}`),
    bootstrapModules: [
      '/_hyri/chunks/bootstrap.js'
    ]
  }

  return renderToReadableStream(
    <Document>
      <Component />
    </Document>,
    renderToReadableStreamOptions
  )
}

export default renderAsyncComponent