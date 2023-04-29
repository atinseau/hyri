import { renderToReadableStream } from 'react-dom/server'
import { Document } from '../components/Document'
import React from 'react'

async function renderAsyncComponent(Component: AsyncComponent) {
  return renderToReadableStream(
    <Document>
      <Component />
    </Document>
  , {})
}

export default renderAsyncComponent