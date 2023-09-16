import { Elysia } from 'elysia'
import { HyriConfigRequired } from '../types/hyriConfig'
import { getCorePlugin } from './plugins/core'


const createElysia = (hyriConfig?: HyriConfigRequired) => {
  const app = new Elysia()

  app.use(getCorePlugin())
  
  return app
}


export {
  createElysia
}