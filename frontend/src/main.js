import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Plugins
import vuetify from './plugins/vuetify'
import elementPlus from './plugins/element-plus'
import fontAwesome from './plugins/fontawesome'
import toast from './plugins/toast'

// Styles
import './assets/styles/main.scss'
import './assets/styles/element-plus-overrides.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(elementPlus)
app.use(fontAwesome)
app.use(toast)

app.mount('#app')
