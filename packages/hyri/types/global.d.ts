
namespace JSX {
  export type ElementType =
    | keyof IntrinsicElements
    | ((props: any) => Element)
    | FunctionComponent<{}>
}

type BootstrapModule = {
  module: string
  output: string
  path: string
}

// Server types

type AsyncComponent = () => Promise<JSX.Element> | JSX.Element

interface RouteConfig {
  path: string
  method?: 'get' | 'post' | 'put' | 'delete'
}

interface View {
  component: AsyncComponent
  route: RouteConfig
}

type ServerConfig = {
  port: number
  views?: View[]
}

// Bin types

type HyriCommand = 'dev' | 'build' | 'start'

interface MinimalHyriConfig {
  command: HyriCommand
}

interface HyriConfig extends MinimalHyriConfig {
  appPath: string
}

type PackageJson = {
  main: string
}