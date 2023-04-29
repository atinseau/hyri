import renderAsyncComponent from "./renderAsyncComponent";

/**
 * It will wrap automatically all components context for Hybrid rendering
 */
async function renderView (component: AsyncComponent) {
  return renderAsyncComponent(component)
}

export default renderView;