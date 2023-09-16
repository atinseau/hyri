

interface ServerContext {
  appMode: "dev" | "build" | "serve"
}

export const serverContext = {} as ServerContext

export const fetchServerContext = () => {
  serverContext.appMode = process.env.APP_MODE as ServerContext["appMode"]
  return serverContext
}