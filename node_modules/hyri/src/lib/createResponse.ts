import renderView from "hyri/src/lib/renderView";

async function createResponse(component: AsyncComponent) {
  const stream = await renderView(component);
  return new Response(stream, {
    headers: {
      'content-type': 'text/html'
    },
  })
}

export default createResponse;