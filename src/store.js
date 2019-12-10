import { createContext } from 'react'

const defaultStore = {
	ideas: [],
	createIdea() {},
	deleteIdea() {}
}

const { Provider, Consumer } = createContext(defaultStore)

export {
	defaultStore,
	Provider,
	Consumer
}