import { Server } from "hyri";

import Home from "./views"
import About from "./views/about";

const server = new Server({
	port: 3000,
	views: [
		Home,
		About
	]
})

server.listen()