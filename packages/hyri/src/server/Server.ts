import { Elysia } from 'elysia'
import createResponse from '../lib/createResponse'
import logger from 'common/logger'
import { bootstrap } from './routes'

class Server {

  static alreadyInit = false
  private Server: Elysia
  private port: number

  constructor(ServerConfig: ServerConfig) {
    if (Server.alreadyInit) {
      throw new Error('Server already initialized')
    }

    this.Server = new Elysia({
      serve: {
        development: process.env.NODE_ENV === 'development',
      }
    })
    this.port = ServerConfig.port

    this.loadInternalRoutes()

    if (ServerConfig.views) {
      for (const view of ServerConfig.views) {
        this.registerView(view)
      }
    }
  }

  listen() {
    this.Server.listen(this.port)
    logger.info(`Hyri is running at http://${this.Server.server?.hostname}:${this.Server.server?.port}`)
  }

  private registerView(view: View) {
    this.Server[view.route.method || 'get'](view.route.path, this.routeHandler.bind(this, view))
  }

  private loadInternalRoutes() {
    this.Server
      .use(bootstrap)
  }

  private async routeHandler(view: View /**, ctx: Context */) {
    return createResponse(view.component);
  }
}

export default Server;