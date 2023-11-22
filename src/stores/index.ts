import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export * from './modules/app'
export * from './modules/route'
export * from './modules/tabs'
export * from './modules/user'
export * from './modules/file'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
