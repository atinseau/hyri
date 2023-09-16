import { define } from "hyri"

import index from './src/pages/Index'
import About from "./src/pages/About"

export default define({
  views: {
    '/': index,
    '/user/:id': index,
    '/about': About
  }
})