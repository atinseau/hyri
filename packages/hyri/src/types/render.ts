import { JSX } from "hyri-preact/jsx-runtime"

export type HyriComponent<T = {}> = (props: T) =>
  | JSX.Element
  | null
  | undefined
  | false

export type HyriRootComponent<T = {}> = HyriComponent<T & {
  params: Record<string, string>
}>

export type BuildManifest = {
  scripts: Record<string, string>
}