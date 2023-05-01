import renderAsyncComponent from "hyri/src/lib/renderAsyncComponent";

/**
 * It will wrap automatically all components context for Hybrid rendering
 */
async function renderView (component: AsyncComponent) {
  return renderAsyncComponent(component)
}

export default renderView;