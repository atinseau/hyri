
namespace JSX {
  export type ElementType =
    | keyof IntrinsicElements
    | ((props: any) => Element)
    | FunctionComponent<{}>
}